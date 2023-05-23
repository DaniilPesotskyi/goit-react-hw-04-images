import React, { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './ImageGallery.module.css';

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [inLoad, setInLoad] = useState(false);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const addImages = newImages => {
    setImages([...images, ...newImages]);
  };

  const fetchImages = async (query, page) => {
    try {
      setInLoad(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=35032978-dd517b2e1f79f34a9f05731b1&image_type=photo&orientation=horizontal&per_page=12`
      );
      const images = await response.json();
      setInLoad(false);
      return images.hits;
    } catch (error) {
      setInLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
    incrementPage();
    fetchImages(query, page).then(images => {
      addImages(images);
    });
  }, [query]);

  const onLoadMore = () => {
    setInLoad(true);
    incrementPage();

    fetchImages(query, page).then(images => {
      addImages(images);
    });
    setInLoad(false);
  };

  return (
    <>
      <ul className={css.galleryList}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            imageURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
      {images.length !== 0 && <Button onLoadMore={onLoadMore} />}
      {inLoad === true && <Loader isOpen={inLoad} />}
      {images.length === 0 && (
        <div className={css.noImagesText}>THERE`RE NO IMAGES YET</div>
      )}
    </>
  );
};

export default ImageGallery;
