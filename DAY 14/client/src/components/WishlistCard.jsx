import { useWishlist } from '../context/WishlistContext';
import '../styles/WishlistCard.css';

export const WishlistCard = ({ item }) => {
  const { removeFromWishlist } = useWishlist();

  const handleRemove = async () => {
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
      try {
        await removeFromWishlist(item._id);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  return (
    <div className="wishlist-card">
      <img src={item.productImage} alt={item.productName} className="card-image" />
      <div className="card-content">
        <h3>{item.productName}</h3>
        <div className="card-meta">
          <span className="category">{item.productCategory}</span>
          <span className="date">Added: {new Date(item.addedAt).toLocaleDateString()}</span>
        </div>
        <div className="card-footer">
          <p className="price">${item.productPrice.toFixed(2)}</p>
          <button onClick={handleRemove} className="btn-remove">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
