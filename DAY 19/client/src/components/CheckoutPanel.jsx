import { useMemo, useState } from 'react';

const initialShippingAddress = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'India'
};

const CheckoutPanel = ({
  cartItems,
  onCreatePaymentOrder,
  creatingPaymentOrder,
  paymentSession,
  isLoggedIn
}) => {
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay Demo');

  const isDisabled = useMemo(
    () =>
      !isLoggedIn ||
      cartItems.length === 0 ||
      creatingPaymentOrder ||
      ['created', 'processing'].includes(paymentSession?.payment?.status),
    [cartItems.length, creatingPaymentOrder, isLoggedIn, paymentSession?.payment?.status]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const created = await onCreatePaymentOrder({ shippingAddress, paymentMethod });

    if (created) {
      setShippingAddress(initialShippingAddress);
      setPaymentMethod('Razorpay Demo');
    }
  };

  return (
    <section className="panel checkout-panel">
      <div className="panel-header">
        <p className="eyebrow">Checkout</p>
        <h2>Delivery details</h2>
        <p>Create a demo Razorpay payment order from your current cart.</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-grid">
          <label>
            Full name
            <input
              type="text"
              name="fullName"
              value={shippingAddress.fullName}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </label>

          <label>
            Address
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </label>

          <label>
            City
            <input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </label>

          <label>
            Postal code
            <input
              type="text"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </label>

          <label>
            Country
            <input
              type="text"
              name="country"
              value={shippingAddress.country}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </label>

          <label>
            Payment gateway
            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              disabled={isDisabled}
            >
              <option>Razorpay Demo</option>
            </select>
          </label>
        </div>

        <button className="primary-button" type="submit" disabled={isDisabled}>
          {creatingPaymentOrder ? 'Creating payment order...' : 'Create payment order'}
        </button>
      </form>
    </section>
  );
};

export default CheckoutPanel;
