const OrderHistory = ({ orders, loading, onCancelOrder }) => (
  <section className="panel order-panel">
    <div className="panel-header">
      <p className="eyebrow">Orders</p>
      <h2>Recent orders</h2>
      <p>Track previously placed orders and cancel any active order.</p>
    </div>

    {loading ? (
      <div className="empty-state">Loading orders...</div>
    ) : orders.length === 0 ? (
      <div className="empty-state">No orders yet. Place one from the checkout form.</div>
    ) : (
      <div className="order-list">
        {orders.map((order) => (
          <article key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <span
                  className={`status-pill ${
                    order.status === 'Cancelled'
                      ? 'cancelled'
                      : order.status === 'Placed'
                        ? 'placed'
                        : order.status === 'Payment Failed'
                          ? 'failed'
                          : 'pending'
                  }`}
                >
                  {order.status}
                </span>
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
              </div>
              <div className="order-summary">
                <span>{new Date(order.createdAt).toLocaleString()}</span>
                <strong>Rs. {order.totalPrice.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="order-items">
              {order.orderItems.map((item) => (
                <div key={`${order._id}-${item.product}`} className="order-item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x Rs. {item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div>
                <p>
                  Ship to: {order.shippingAddress.fullName}, {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city}
                </p>
                <p>
                  Payment: {order.paymentMethod} ({order.paymentStatus})
                </p>
              </div>

              {order.status === 'Placed' && (
                <button
                  className="ghost-button danger-button"
                  type="button"
                  onClick={() => onCancelOrder(order._id)}
                >
                  Cancel order
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);

export default OrderHistory;
