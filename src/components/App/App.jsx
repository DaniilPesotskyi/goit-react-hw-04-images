import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

const App = () => {
    const [searchQuery, setSearchQuery] = useState()

    const onSetSearchQuery = query => {
        setSearchQuery(query)
    };

    return (
        <>
            <Searchbar onSubmit={onSetSearchQuery} />
            <ImageGallery query={searchQuery}/>
            <ToastContainer autoClose={2500}/>
        </>
    );
}

export default App;
