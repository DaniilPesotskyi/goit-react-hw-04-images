import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './ImageGallery.module.css';

const ImageGallery = ({items, inLoad, onLoadMore}) => {
  return (
    <>
        <ul className={css.galleryList}>
            {items.map(
                ({ id, webformatURL, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        imageURL={webformatURL}
                        largeImageURL={largeImageURL}
                    />
                )
            )}
        </ul>
        {items.length !== 0 && (
            <Button onLoadMore={onLoadMore} />
        )}
        {inLoad === true && (<Loader isOpen={inLoad}/>)}
        {items.length === 0 && (
            <div className={css.noImagesText}>THERE`RE NO IMAGES YET</div>
        )}
    </>
);
}


export default ImageGallery;
