// ProductItem component - single product display
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import styles from './ProductItem.module.css';

/**
 * ProductItem Component
 * @param {Object} product - Product data object
 * @param {number} product.id - Product ID
 * @param {string} product.title - Product title
 * @param {number} product.price - Product price
 * @param {string} product.thumbnail - Product image URL
 * @param {number} product.rating - Product rating
 */
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.imageContainer}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.productImage}
          loading="lazy"
        />
      </Link>

      <div className={styles.productContent}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.ratingSection}>
          <span className={styles.rating}>⭐ {product.rating?.toFixed(1) || 'N/A'}</span>
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>${product.price?.toFixed(2) || '0.00'}</span>
          {product.discountPercentage && (
            <span className={styles.discount}>
              -{product.discountPercentage?.toFixed(0)}%
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.addToCartBtn}
            onClick={handleAddToCart}
            title="Add to cart"
          >
            🛒 Add to Cart
          </button>

          <Link
            to={`/product/${product.id}`}
            className={styles.viewBtn}
            title="View details"
          >
            👁️ View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
