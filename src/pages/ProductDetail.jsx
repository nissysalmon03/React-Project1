// ProductDetail page - displays detailed information about a selected product
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import styles from './ProductDetail.module.css';

/**
 * ProductDetail Component
 * Fetches and displays full product information using route parameters
 */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load product details');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    // Show feedback
    alert(`Added ${quantity} item(s) to cart!`);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <h2>⚠️ Error Loading Product</h2>
          <p>{error}</p>
          <Link to="/" className={styles.backLink}>
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className={styles.backLink}>
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← Back to Products
      </Link>

      <div className={styles.productDetail}>
        {/* Product Images Gallery */}
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              loading="lazy"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.slice(0, 4).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={styles.thumbnail}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className={styles.infoSection}>
          <h1>{product.title}</h1>

          <div className={styles.ratingSection}>
            <span className={styles.rating}>⭐ {product.rating?.toFixed(1) || 'N/A'}</span>
            <span className={styles.reviews}>({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>${product.price?.toFixed(2) || '0.00'}</span>
            {product.discountPercentage && (
              <span className={styles.discount}>
                Save {product.discountPercentage?.toFixed(0)}%
              </span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {product.brand && (
            <div className={styles.detailRow}>
              <strong>Brand:</strong>
              <span>{product.brand}</span>
            </div>
          )}

          {product.category && (
            <div className={styles.detailRow}>
              <strong>Category:</strong>
              <span>{product.category}</span>
            </div>
          )}

          {product.sku && (
            <div className={styles.detailRow}>
              <strong>SKU:</strong>
              <span>{product.sku}</span>
            </div>
          )}

          {product.stock !== undefined && (
            <div className={styles.detailRow}>
              <strong>Stock:</strong>
              <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          )}

          {product.warrantyInformation && (
            <div className={styles.detailRow}>
              <strong>Warranty:</strong>
              <span>{product.warrantyInformation}</span>
            </div>
          )}

          {product.shippingInformation && (
            <div className={styles.detailRow}>
              <strong>Shipping:</strong>
              <span>{product.shippingInformation}</span>
            </div>
          )}

          <div className={styles.actionSection}>
            <div className={styles.quantityControl}>
              <label htmlFor="quantity">Quantity:</label>
              <div className={styles.quantityInput}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, val));
                  }}
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {product.reviews && product.reviews.length > 0 && (
        <div className={styles.reviewsSection}>
          <h2>Customer Reviews</h2>
          <div className={styles.reviewsList}>
            {product.reviews.slice(0, 3).map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewRating}>⭐ {review.rating}</span>
                  <span className={styles.reviewerName}>{review.reviewerName}</span>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
