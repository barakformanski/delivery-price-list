import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 page</h1>
      <Link to="/" style={{ cursor: 'pointer' }}>
        <h1>Take me back home</h1>
      </Link>
    </div>
  );
};

export default NotFound;
