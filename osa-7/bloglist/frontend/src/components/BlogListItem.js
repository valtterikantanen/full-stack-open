import { Link } from 'react-router-dom';

const BlogListItem = ({ blog }) => {
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  };

  return (
    <div style={style} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export default BlogListItem;
