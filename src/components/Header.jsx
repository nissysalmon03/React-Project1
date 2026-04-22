// Header component with navigation and cart icon
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemCount, setSearchQuery } from '../redux/cartSlice';
import styles from './Header.module.css';

const Header = () => {
  const cartCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>🛍️ ShoppyGlobe</h1>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products..."
            onChange={handleSearchChange}
          />
          <Link to="/cart" className={styles.cartLink}>
            🛒 Cart
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
