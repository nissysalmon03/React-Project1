// Cart component - displays all items in cart
import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';
import styles from './Cart.module.css';

// Lazy load CartItem
const CartItem = lazy(() => import('./CartItem'));

/**
 * Cart Component
 * Displays cart items and provides checkout option
 */
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <h2>🛒 Your Cart is Empty</h2>
          <p>Start shopping to add items to your cart!</p>
          <Link to="/" className={styles.continueShopping}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>

      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          <h2>Items ({cartItems.length})</h2>
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <Suspense
                key={item.id}
                fallback={<div className={styles.skeleton} />}
              >
                <CartItem item={item} />
              </Suspense>
            ))}
          </div>
        </div>

        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax:</span>
              <span>${(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
            </div>

            <Link to="/checkout" className={styles.checkoutBtn}>
              Proceed to Checkout
            </Link>

            <Link to="/" className={styles.continueShoppingBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
