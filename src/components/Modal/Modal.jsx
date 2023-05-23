import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ imageURL, isOpen, onToggle }) => {
  const onEscClick = e => {
    if (e.key === 'Escape') {
      onToggle();
      window.removeEventListener('keydown', onEscClick);
    }
  };

  const onBackdropClick = e => {
    const backdrop = document.querySelector('[data-backdrop]');
    if (backdrop === e.target) {
      onToggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
  });

  if (isOpen) {
    return (
      <div className={css.Overlay} onClick={onBackdropClick} data-backdrop>
        <div className={css.Modal}>
          <img src={imageURL} alt="img" />
        </div>
      </div>
    );
  }
};

export default Modal;
