const CartPanel = ({ cartItems, onQuantityChange, onRemoveItem, totals }) => (
  <section className="panel cart-panel">
    <div className="panel-header">
      <p className="eyebrow">Shopping Bag</p>
      <h2>Your picks</h2>
      <p>Review items, adjust quantity, and continue to checkout.</p>
    </div>

    {cartItems.length === 0 ? (
      <div className="empty-state">Your bag is empty. Add products from the catalog.</div>
    ) : (
      <>
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.product} className="cart-item">
              <div className="cart-item-info">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="cart-item-actions">
                <label>
                  Qty
                  <select
                    value={item.quantity}
                    onChange={(event) =>
                      onQuantityChange(item.product, Number(event.target.value))
                    }
                  >
                    {Array.from({ length: item.countInStock }, (_, index) => index + 1).map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <button
                  className="ghost-button danger-button"
                  type="button"
                  onClick={() => onRemoveItem(item.product)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="totals-card">
          <div>
            <span>Items</span>
            <strong>Rs. {totals.itemsPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span>Shipping</span>
            <strong>Rs. {totals.shippingPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span>Tax</span>
            <strong>Rs. {totals.taxPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div className="totals-grand">
            <span>Total</span>
            <strong>Rs. {totals.totalPrice.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </>
    )}
  </section>
);

export default CartPanel;
