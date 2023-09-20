import { createPortal } from 'react-dom';

export function Modal({ children }) {
  return createPortal(
    <div className="absolute top-0">
      { children }
    </div>,
    document.getElementById('portal'),
  );
}
