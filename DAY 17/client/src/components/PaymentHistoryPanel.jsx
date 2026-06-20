const PaymentHistoryPanel = ({ payments, loading }) => (
  <section className="panel payment-history-panel">
    <div className="panel-header">
      <p className="eyebrow">Payment History</p>
      <h2>Gateway transactions</h2>
      <p>Review all demo payment attempts with linked order status and final outcome.</p>
    </div>

    {loading ? (
      <div className="empty-state">Loading payment history...</div>
    ) : payments.length === 0 ? (
      <div className="empty-state">No payment transactions yet. Create one from checkout.</div>
    ) : (
      <div className="order-list">
        {payments.map((payment) => (
          <article key={payment._id} className="order-card">
            <div className="order-header">
              <div>
                <span className={`status-pill ${payment.status}`}>{payment.status}</span>
                <h3>Payment #{payment.gatewayOrderId.slice(-6).toUpperCase()}</h3>
              </div>
              <div className="order-summary">
                <span>{new Date(payment.createdAt).toLocaleString()}</span>
                <strong>Rs. {payment.amount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="payment-session-meta">
              <div>
                <span>Gateway</span>
                <strong>{payment.gateway}</strong>
              </div>
              <div>
                <span>Method</span>
                <strong>{payment.method}</strong>
              </div>
              <div>
                <span>Order status</span>
                <strong>{payment.order?.status || 'Unknown'}</strong>
              </div>
            </div>

            <div className="order-footer">
              <div>
                <p>Receipt: {payment.receipt}</p>
                <p>
                  Shipping: {payment.order?.shippingAddress?.fullName},{' '}
                  {payment.order?.shippingAddress?.city}
                </p>
              </div>
              <div className="payment-history-note">
                {payment.failureReason || payment.order?.paymentResult?.message || 'Awaiting final state'}
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);

export default PaymentHistoryPanel;
