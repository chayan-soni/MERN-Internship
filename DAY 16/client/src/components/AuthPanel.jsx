import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  password: ''
};

const AuthPanel = ({ onRegister, onLogin, loading }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegisterMode) {
      await onRegister(formData);
    } else {
      await onLogin({
        email: formData.email,
        password: formData.password
      });
    }

    setFormData(initialState);
  };

  return (
    <section className="panel auth-panel">
      <div className="panel-header">
        <p className="eyebrow">Access</p>
        <h2>{isRegisterMode ? 'Create your account' : 'Sign in to continue'}</h2>
        <p>Register or log in to place orders and review previous purchases.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegisterMode && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Chayan Soni"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            minLength="6"
            required
          />
        </label>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isRegisterMode ? 'Register' : 'Login'}
        </button>
      </form>

      <button
        className="ghost-button"
        type="button"
        onClick={() => setIsRegisterMode((current) => !current)}
      >
        {isRegisterMode ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </section>
  );
};

export default AuthPanel;
