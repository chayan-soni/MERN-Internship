const ToastContainer = ({ toasts, onClose }) => (
  <div className="toast-container">
    {toasts.map((toast) => (
      <div key={toast.id} className={`toast toast-${toast.type}`}>
        <span>{toast.message}</span>
        <button type="button" onClick={() => onClose(toast.id)}>
          x
        </button>
      </div>
    ))}
  </div>
);

export default ToastContainer;
