// CartItem component - single cart item display
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import styles from './CartItem.module.css';

/**
 * CartItem Component
 * @param {Object} item - Cart item object
 * @param {number} item.id - Product ID
 * @param {string} item.title - Product title
 * @param {number} item.price - Product price
 * @param {string} item.thumbnail - Product image
 * @param {number} item.quantity - Item quantity in cart
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className={styles.cartItem}>
      <img
        src={item.thumbnail}
        alt={item.title}
        className={styles.itemImage}
        loading="lazy"
      />

      <div className={styles.itemDetails}>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        <p className={styles.itemPrice}>${item.price?.toFixed(2) || '0.00'}</p>
      </div>

      <div className={styles.quantityControl}>
        <button
          className={styles.quantityBtn}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          title="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          className={styles.quantityInput}
          value={item.quantity}
          onChange={(e) => {
            const newQty = parseInt(e.target.value) || 1;
            if (newQty >= 1) {
              handleQuantityChange(newQty);
            }
          }}
          min="1"
        />
        <button
          className={styles.quantityBtn}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          title="Increase quantity"
        >
          +
        </button>
      </div>

      <div className={styles.itemTotal}>
        <p className={styles.totalLabel}>Total:</p>
        <p className={styles.totalPrice}>${itemTotal}</p>
      </div>

      <button
        className={styles.removeBtn}
        onClick={handleRemove}
        title="Remove from cart"
      >
        🗑️ Remove
      </button>
    </div>
  );
};

export default CartItem;
