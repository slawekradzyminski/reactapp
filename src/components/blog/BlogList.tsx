import { Link } from 'react-router-dom';
import blogIndex from '../../data/blog/index.json';

const BlogList = () => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogIndex.map((post) => (
          <li key={post.id}>
            <Link to={post.permalink}>
              <h2>{post.title}</h2>
            </Link>
            <p>Date: {post.date}</p>
            <p>Categories: {post.categories.join(', ')}</p>
            <p>Tags: {post.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;