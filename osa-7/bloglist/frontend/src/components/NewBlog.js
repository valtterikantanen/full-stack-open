import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await createBlog({ title, author, url });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="title"
            placeholder="title of the blog"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            placeholder="author of the blog"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            placeholder="url of the blog"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
