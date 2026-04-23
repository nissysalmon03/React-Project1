# 🛍️ ShoppyGlobe - E-commerce Application

A modern, fully-functional e-commerce web application built with **React**, **Vite**, **Redux**, and **React Router**. ShoppyGlobe provides a complete shopping experience with product browsing, cart management, and a checkout process.

## 🚀 Features

### ✨ Core Functionality
- **Product Catalog**: Browse thousands of products with real-time search filtering
- **Product Details**: View detailed information about each product including images, ratings, and reviews
- **Shopping Cart**: Add/remove items and manage quantities with Redux state management
- **Checkout System**: Dummy checkout form with order confirmation
- **Responsive Design**: Fully responsive and mobile-friendly interface

### 🔧 Technical Features
- **React 18** with functional components and hooks
- **Redux & Redux Toolkit** for complex state management
- **React Router v6** with createBrowserRouter for dynamic routing
- **Code Splitting** with React.lazy and Suspense for performance optimization
- **Custom Hooks** for data fetching (useProductList)
- **API Integration** with DummyJSON API for real product data
- **Error Handling** with graceful error messages
- **Lazy Loading** for images and components
- **CSS Modules** for scoped styling

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation and cart badge
│   ├── Header.module.css
│   ├── ProductItem.jsx         # Single product card
│   ├── ProductItem.module.css
│   ├── ProductList.jsx         # List of all products with search
│   ├── ProductList.module.css
│   ├── Cart.jsx                # Shopping cart display
│   ├── Cart.module.css
│   └── CartItem.jsx            # Single cart item
│   └── CartItem.module.css
├── pages/
│   ├── ProductDetail.jsx       # Product detail page
│   ├── ProductDetail.module.css
│   ├── Checkout.jsx            # Checkout form
│   ├── Checkout.module.css
│   ├── NotFound.jsx            # 404 page
│   └── NotFound.module.css
├── redux/
│   ├── store.js                # Redux store configuration
│   └── cartSlice.js            # Cart reducer and actions
├── hooks/
│   └── useProductList.js       # Custom hook for fetching products
├── styles/
│   └── global.css              # Global styles
├── App.jsx                     # Main app component with routing
├── main.jsx                    # Entry point
└── index.html
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd shoppyglobe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📦 Dependencies

### Main Dependencies
- `react`: ^18.2.0 - UI library
- `react-dom`: ^18.2.0 - React DOM rendering
- `react-router-dom`: ^6.20.0 - Client-side routing
- `redux`: ^4.2.1 - State management
- `react-redux`: ^8.1.3 - React bindings for Redux
- `@reduxjs/toolkit`: ^1.9.7 - Redux utilities

### Dev Dependencies
- `vite`: ^5.0.0 - Build tool and dev server
- `@vitejs/plugin-react`: ^4.2.0 - React plugin for Vite
- `eslint`: ^8.54.0 - Code linting

## 🎯 Component Architecture

### Header Component
- Navigation menu with links to Home and Checkout
- Search input for filtering products
- Cart icon with item count badge
- Redux integration for search state

### ProductList Component
- Fetches products from DummyJSON API using custom hook
- Displays products in responsive grid
- Search filtering functionality
- Error handling and loading states
- React.lazy for performance optimization

### ProductItem Component
- Displays individual product card
- Shows price, rating, and discount
- Add to Cart button with Redux dispatch
- Link to product detail page
- Lazy loaded images

### ProductDetail Component
- Fetches individual product data based on route parameter
- Displays full product information
- Product gallery with multiple images
- Customer reviews section
- Quantity selector before adding to cart
- Error handling for missing products

### Cart Component
- Displays all items in cart
- Cart summary with subtotal, tax, and total
- Order summary sidebar
- Links to continue shopping or checkout

### CartItem Component
- Individual cart item display
- Quantity adjustment buttons
- Remove from cart functionality
- Real-time price calculation

### Checkout Component
- User detail form (name, email, address, phone)
- Payment information (card number)
- Form validation
- Order summary display
- Order confirmation with auto-redirect to home

### NotFound Component
- 404 error page for unknown routes
- Displays requested path and error details
- Links back to home and cart
- Animated robot illustration

## 🔄 Redux State Management

### Cart Slice
- **State**: `items` array and `searchQuery` string
- **Actions**:
  - `addToCart` - Add product to cart
  - `removeFromCart` - Remove product from cart
  - `updateQuantity` - Update product quantity (minimum 1)
  - `clearCart` - Empty the entire cart
  - `setSearchQuery` - Update search filter
- **Selectors**:
  - `selectCartItems` - Get all cart items
  - `selectCartTotal` - Calculate total price
  - `selectCartItemCount` - Get total item count
  - `selectSearchQuery` - Get current search query

## 📡 API Integration

### DummyJSON API
- **Products List**: `https://dummyjson.com/products`
- **Product Detail**: `https://dummyjson.com/products/{id}`

The custom `useProductList` hook handles:
- API fetching with error handling
- Loading states
- Data caching via component state

## 🎨 Styling

- **CSS Modules** for component-scoped styling
- **Global CSS** for base styles and utilities
- **Responsive Design** with media queries
- **Mobile-first** approach
- **Animations** for smooth user experience
- **Accessibility** considerations

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on buttons
- Keyboard navigation support
- Color contrast compliance
- Loading state feedback

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🚀 Performance Optimizations

1. **Code Splitting**: Lazy loading for ProductDetail, Checkout, and NotFound pages
2. **Image Lazy Loading**: `loading="lazy"` attribute on images
3. **React.lazy & Suspense**: Component-level code splitting
4. **Memoization**: useMemo for search filtering
5. **Redux Toolkit**: Efficient state updates

## 🔍 Search Feature

- Real-time search across product titles and descriptions
- Powered by Redux state management
- Efficient filtering with useMemo
- Case-insensitive search
- Product count display

## 🛒 Cart Management

- **Add to Cart**: Single or multiple quantity
- **Update Quantity**: Minimum quantity of 1
- **Remove from Cart**: Individual item removal
- **Clear Cart**: Empty entire cart after checkout
- **Real-time Updates**: Redux ensures instant state updates

## ✅ Form Validation

Checkout form includes:
- Required field validation
- Email format validation
- Phone number validation (10+ digits)
- Credit card number validation (16 digits)
- User-friendly error messages

## 🌟 Routing

Using React Router v6 with createBrowserRouter:
- **/** - Home page (Product list)
- **/product/:id** - Product detail page
- **/cart** - Shopping cart
- **/checkout** - Checkout form
- **\*** - 404 Not Found page

## 📝 Code Quality

- **Comments**: Comprehensive JSDoc comments for all components
- **Proper Indentation**: Consistent code formatting
- **Readable Code**: Clear variable and function naming
- **Modular Structure**: Separated concerns and reusable components
- **Error Handling**: Graceful error messages and fallbacks

## 🔐 Security Notes

- **Dummy Checkout**: The checkout form is for demonstration only
- **No Real Payments**: Card numbers are not validated for real transactions
- **API Only**: No backend authentication required

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a comprehensive e-commerce project demonstrating:
- Modern React best practices
- Advanced state management with Redux
- Client-side routing with React Router
- Performance optimization techniques
- Responsive web design

## 🔗 GitHub Repository
https://github.com/nissysalmon03/React-Project1

---

**Happy Shopping! 🛍️**
