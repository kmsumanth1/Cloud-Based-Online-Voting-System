import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  return (
    <nav
      className={`${styles.navbar} ${
        isAdmin ? styles.admin : styles.voter
      }`}
    >
      <div className={styles.brand}>CloudVote</div>

      <div className={styles.links}>
        {!isAdmin && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/results">Results</Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin">Admin Panel</Link>
        )}

        <button
          className={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
