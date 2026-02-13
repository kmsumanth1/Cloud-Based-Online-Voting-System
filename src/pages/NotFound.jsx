import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved.
      </p>

      <Link to="/" className={styles.button}>
        Go Back to Login
      </Link>
    </div>
  );
}

export default NotFound;
