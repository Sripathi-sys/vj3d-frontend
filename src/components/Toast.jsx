// src/components/Toast.jsx
import { useCart } from '../context/CartContext';

function Toast() {
  const { toasts } = useCart();
  if (!toasts || toasts.length === 0) return null;
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type || ''}`}>{t.message}</div>
      ))}
    </div>
  );
}

export default Toast;
