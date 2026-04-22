// ProductList component - displays list of all products
import { Suspense, lazy, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useProductList from '../hooks/useProductList';
import { selectSearchQuery } from '../redux/cartSlice';
import styles from './ProductList.module.css';

// Lazy load ProductItem
const ProductItem = lazy(() => import('./ProductItem'));

/**
 * ProductList Component
 * Fetches and displays products from API
 * Supports search functionality through Redux state
 */
const ProductList = () => {
  const { products, loading, error } = useProductList();
  const searchQuery = useSelector(selectSearchQuery);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [products, searchQuery]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <h2>⚠️ Error Loading Products</h2>
          <p>{error}</p>
          <p>Please check your internet connection and try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          Products
          {searchQuery && ` - "${searchQuery}"`}
        </h2>
        <p className={styles.productCount}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.noProducts}>
          <h3>😔 No Products Found</h3>
          <p>
            {searchQuery
              ? `We couldn't find any products matching "${searchQuery}"`
              : 'No products available at the moment'}
          </p>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <Suspense key={product.id} fallback={<div className={styles.skeleton} />}>
              <ProductItem product={product} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
