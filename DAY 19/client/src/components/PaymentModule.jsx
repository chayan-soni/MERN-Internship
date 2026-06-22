const formatTimelineLabel = (status) =>
  status
    .split('_')
    .join(' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const PaymentModule = ({
  paymentSession,
  verifyingPayment,
  onVerifyPayment,
  onResetPaymentSession
}) => {
  const payment = paymentSession?.payment;
  const order = paymentSession?.order;

  if (!payment || !order) {
    return (
      <section className="panel payment-module">
        <div className="panel-header">
          <p className="eyebrow">Payment Module</p>
          <h2>Razorpay demo flow</h2>
          <p>Create a payment order from checkout to start the simulated gateway flow.</p>
        </div>

        <div className="empty-state">
          No active payment session. Your next checkout attempt will appear here.
        </div>
      </section>
    );
  }

  const isAwaitingAction = ['created', 'processing'].includes(payment.status);
  const isPaid = payment.status === 'paid';
  const isFailed = payment.status === 'failed';

  return (
    <section className="panel payment-module">
      <div className="panel-header">
        <p className="eyebrow">Payment Module</p>
        <h2>Razorpay demo flow</h2>
        <p>Use the controls below to simulate gateway success and failure responses.</p>
      </div>

      <div className="payment-session-card">
        <div className="order-header">
          <div>
            <span className={`status-pill ${payment.status}`}>
              {formatTimelineLabel(payment.status)}
            </span>
            <h3>Gateway Order #{payment.gatewayOrderId.slice(-6).toUpperCase()}</h3>
          </div>
          <div className="order-summary">
            <span>{payment.gateway}</span>
            <strong>Rs. {payment.amount.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div className="payment-session-meta">
          <div>
            <span>Receipt</span>
            <strong>{payment.receipt}</strong>
          </div>
          <div>
            <span>Method</span>
            <strong>{order.paymentMethod}</strong>
          </div>
          <div>
            <span>Order status</span>
            <strong>{order.status}</strong>
          </div>
        </div>

        <div className="payment-timeline">
          {payment.timeline.map((entry, index) => (
            <div key={`${entry.status}-${index}`} className="timeline-item">
              <span className={`timeline-dot ${entry.status}`} />
              <div>
                <strong>{formatTimelineLabel(entry.status)}</strong>
                <p>{entry.message}</p>
              </div>
              <time>{new Date(entry.createdAt).toLocaleTimeString()}</time>
            </div>
          ))}
        </div>

        <div className="payment-module-actions">
          {isAwaitingAction && (
            <>
              <button
                className="primary-button"
                type="button"
                disabled={verifyingPayment}
                onClick={() => onVerifyPayment('success')}
              >
                {verifyingPayment ? 'Processing...' : 'Simulate Success'}
              </button>
              <button
                className="ghost-button danger-button"
                type="button"
                disabled={verifyingPayment}
                onClick={() => onVerifyPayment('failed')}
              >
                Simulate Failure
              </button>
            </>
          )}

          {(isPaid || isFailed) && (
            <button className="ghost-button" type="button" onClick={onResetPaymentSession}>
              Clear session
            </button>
          )}
        </div>

        {isPaid && (
          <p className="form-note">
            Payment verified. The order has been placed and stock has been updated.
          </p>
        )}

        {isFailed && (
          <p className="form-note error-note">
            Payment failed in demo mode. The cart is preserved so you can try again.
          </p>
        )}
      </div>
    </section>
  );
};

export default PaymentModule;
