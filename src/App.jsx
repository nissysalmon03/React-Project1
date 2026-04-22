// Main App component with routing setup
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './redux/store'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './styles/global.css'

// Lazy load pages for code splitting and performance optimization
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  }}>
    <div style={{
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      border: '4px solid #f0f0f0',
      borderTop: '4px solid #007bff',
      animation: 'spin 1s linear infinite',
    }}></div>
  </div>
)

// Layout wrapper component with header
const RootLayout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
)

// Home page route
const HomePage = () => (
  <RootLayout>
    <ProductList />
  </RootLayout>
)

// Cart page route
const CartPage = () => (
  <RootLayout>
    <Cart />
  </RootLayout>
)

// Product detail page with fallback
const ProductDetailPage = () => (
  <RootLayout>
    <Suspense fallback={<LoadingFallback />}>
      <ProductDetail />
    </Suspense>
  </RootLayout>
)

// Checkout page with fallback
const CheckoutPage = () => (
  <RootLayout>
    <Suspense fallback={<LoadingFallback />}>
      <Checkout />
    </Suspense>
  </RootLayout>
)

// NotFound page with fallback
const NotFoundPage = () => (
  <RootLayout>
    <Suspense fallback={<LoadingFallback />}>
      <NotFound />
    </Suspense>
  </RootLayout>
)

// Create router with createBrowserRouter for better features and data handling
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

/**
 * App Component
 * Main entry point for the ShoppyGlobe e-commerce application
 * - Redux store provider for state management
 * - React Router for navigation
 * - Lazy loading for performance optimization
 */
const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
