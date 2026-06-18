import { useMemo, useState } from 'react';

const initialShippingAddress = {
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'India'
};

const CheckoutPanel = ({ cartItems, onPlaceOrder, placingOrder, isLoggedIn }) => {
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const isDisabled = useMemo(
    () => !isLoggedIn || cartItems.length === 0 || placingOrder,
    [cartItems.length, isLoggedIn, placingOrder]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onPlaceOrder({ shippingAddress, paymentMethod });
    setShippingAddress(initialShippingAddress);
    setPaymentMethod('Cash on Delivery');
  };

  return (
    <section className="panel checkout-panel">
      <div className="panel-header">
        <p className="eyebrow">Checkout</p>
        <h2>Delivery details</h2>
        <p>Submit your shipping info and payment method to place the order.</p>
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
            Payment method
            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              disabled={isDisabled}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
          </label>
        </div>

        <button className="primary-button" type="submit" disabled={isDisabled}>
          {placingOrder ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </section>
  );
};

export default CheckoutPanel;
