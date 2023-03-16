import PropTypes from 'prop-types';
import { useState } from 'react';

const NewBlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNewBlog = async e => {
    e.preventDefault();
    await createNewBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={e => setAuthor(e.target.value)}
            placeholder="Author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={e => setUrl(e.target.value)}
            placeholder="URL"
          />
        </div>
        <button id="create-blog-btn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
};

export default NewBlogForm;
