import { createContext, useContext, useMemo, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const showToast = (message, type = 'info') => {
    const id = crypto.randomUUID();
    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);

    window.setTimeout(() => removeToast(id), 3000);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
