// Checkout page - order form and confirmation
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';
import styles from './Checkout.module.css';

/**
 * Checkout Component
 * Displays checkout form to collect user details
 * Shows product summary and handles order placement
 */
const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    cardNumber: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, address, city, state, postalCode, cardNumber } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !cardNumber
    ) {
      alert('Please fill in all required fields');
      return false;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Basic phone validation
    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (10+ digits)');
      return false;
    }

    // Card number validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show order confirmation
    setOrderPlaced(true);

    // Clear cart and redirect after 3 seconds
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyMessage}>
          <h2>Your cart is empty!</h2>
          <p>Add items to your cart before proceeding to checkout.</p>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ← Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase.</p>
          <p className={styles.redirectMessage}>
            Redirecting you to home page in a few seconds...
          </p>
          <button className={styles.homeBtn} onClick={() => navigate('/')}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const tax = cartTotal * 0.1;
  const totalAmount = cartTotal + tax;

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.checkoutLayout}>
        <form className={styles.checkoutForm} onSubmit={handlePlaceOrder}>
          <div className={styles.formSection}>
            <h2>Billing Information</h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Street Address *</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">State/Province *</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="NY"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Payment Information</h2>

            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number *</label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
              <small>Enter 16-digit card number</small>
            </div>
          </div>

          <button type="submit" className={styles.placeOrderBtn}>
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <aside className={styles.orderSummary}>
          <h2>Order Summary</h2>

          <div className={styles.summaryItems}>
            <h3>Items ({cartItems.length})</h3>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.title}</p>
                  <p className={styles.itemQty}>Qty: {item.quantity}</p>
                </div>
                <p className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.summaryTotal}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
