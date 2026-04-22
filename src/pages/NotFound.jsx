// NotFound page - 404 error page
import { Link, useLocation } from 'react-router-dom';
import styles from './NotFound.module.css';

/**
 * NotFound Component
 * Displays 404 page for unknown routes
 * Shows error details and navigation options
 */
const NotFound = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>

        <h1>Page Not Found</h1>

        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.errorDetails}>
          <h2>Error Details:</h2>
          <ul>
            <li>
              <strong>Requested Path:</strong> <code>{location.pathname}</code>
            </li>
            <li>
              <strong>Status Code:</strong> <code>404</code>
            </li>
            <li>
              <strong>Error Type:</strong> <code>Page Not Found</code>
            </li>
            <li>
              <strong>Timestamp:</strong> <code>{new Date().toLocaleString()}</code>
            </li>
          </ul>
        </div>

        <p className={styles.suggestion}>
          This might happen if you followed a broken link, entered an incorrect URL, or accessed a
          page that has been removed.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeLink}>
            ← Go Back Home
          </Link>

          <Link to="/cart" className={styles.cartLink}>
            🛒 View Cart
          </Link>
        </div>

        <p className={styles.footer}>
          Need help? Check out our <Link to="/">home page</Link> for more information.
        </p>
      </div>

      <div className={styles.illustration}>
        <div className={styles.robot}>
          <div className={styles.head}>
            <div className={styles.eye}></div>
            <div className={styles.eye}></div>
            <div className={styles.mouth}></div>
          </div>
          <div className={styles.body}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
