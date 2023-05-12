const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const query = {};
      if (author) {
        query.author = await Author.find({ name: author });
      }
      if (genre) {
        query.genres = genre;
      }
      return Book.find(query);
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, { title, published, author: authorName, genres }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }
      let author = await Author.findOne({ name: authorName });
      if (author === null) {
        author = new Author({ name: authorName });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError('Adding a new author to database failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: authorName,
              error
            }
          });
        }
      }
      const book = new Book({ title, published, author, genres });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Adding a new book to database failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: title,
            error
          }
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
      // return book.save();
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }
      const author = await Author.findOne({ name: name });
      if (author === null) return null;
      author.born = setBornTo;
      return author.save();
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });
      try {
        user.save();
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error
          }
        });
      }
      return user;
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username: username });
      if (!user || password !== 'secret') {
        throw new GraphQLError('Wrong username or password', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }
      const userForToken = { username: user.username, id: user._id };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
  Author: {
    bookCount: async ({ _id }) => Book.countDocuments({ author: _id })
  },
  Book: {
    author: async ({ author }) => Author.findById(author)
  }
};

module.exports = resolvers;
