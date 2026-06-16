import { useWishlist } from '../context/WishlistContext';
import { WishlistCard } from './WishlistCard';
import '../styles/WishlistList.css';

export const WishlistList = () => {
  const { wishlist, loading, error } = useWishlist();

  if (loading) {
    return <div className="wishlist-list loading">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="wishlist-list error">Error: {error}</div>;
  }

  if (wishlist.length === 0) {
    return <div className="wishlist-list empty">Your wishlist is empty. Add items to get started!</div>;
  }

  return (
    <div className="wishlist-list">
      <h2>My Wishlist ({wishlist.length} items)</h2>
      <div className="wishlist-grid">
        {wishlist.map(item => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};
