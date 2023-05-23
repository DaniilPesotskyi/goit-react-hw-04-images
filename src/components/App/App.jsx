import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

const App = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [inLoad, setIsLoad] = useState(false);




  useEffect(() => {
    // FETCH IMAGES FUNCTION
    const fetchImages = async (query, page) => {
        try {
            const response = await fetch(
                `https://pixabay.com/api/?q=${query}&page=${page}&key=35032978-dd517b2e1f79f34a9f05731b1&image_type=photo&orientation=horizontal&per_page=12`
            );
            const images = await response.json();
            return images.hits;
        } catch (error) {
            console.log(error);
        }
    };

    const getImages = async () => {
      try {
        setIsLoad(true);

        const newImages = await fetchImages(searchQuery, page);
        setImages(i => page === 1 ? newImages : [...i, ...newImages])
        setIsLoad(false);
      } catch (error) {
        console.log(error);
        setIsLoad(false);
      }
    };

    searchQuery && getImages();
}, [page, searchQuery]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // SUBMIT FORM
  const onSetSearchQuery = query => {
    setPage(1)
    setSearchQuery(query);
  };

  return (
    <>
      <Searchbar onSubmit={onSetSearchQuery} />
      <ImageGallery items={images} inLoad={inLoad} onLoadMore={onLoadMore}/>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default App;
