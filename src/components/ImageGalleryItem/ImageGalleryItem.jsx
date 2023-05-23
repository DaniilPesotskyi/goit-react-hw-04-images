import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({imageURL ,largeImageURL}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  };

  const closeModal = () => {
    setIsModalOpen(false)
  };

  return (
    <li className={css.galleryItem}>
      <img
        onClick={() => onModalToggle()}
        className={css.galleryItemImage}
        src={imageURL}
        alt="img"
      />
      <Modal
        imageURL={largeImageURL}
        isOpen={isModalOpen}
        onToggle={closeModal}
      />
    </li>
  );
};

export default ImageGalleryItem;
