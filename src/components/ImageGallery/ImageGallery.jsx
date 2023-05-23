import React, { useEffect, useState, Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
      images: [],
      page: 1,
      inLoad: false
  };

  incrementPage = () => {
      this.setState(prevState => ({
          page: prevState.page + 1,
      }));
  };

  addImages = newImages => {
      this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
      }));
  };

  fetchImages = async (query, page) => {
      try {

          this.setState({inLoad: true})
          const response = await fetch(
              `https://pixabay.com/api/?q=${query}&page=${page}&key=35032978-dd517b2e1f79f34a9f05731b1&image_type=photo&orientation=horizontal&per_page=12`
          );
          const images = await response.json();
          this.setState({inLoad: false})
          return images.hits;
      } catch (error) {
          this.setState({inLoad: false})
          console.log(error);
      }
  };

  componentDidUpdate(prevProps, prevState) {
      const prevQuery = prevProps.query;
      const currentQuery = this.props.query;

      if (prevQuery !== currentQuery) {
          this.setState({ images: [], page: 1 });
          this.incrementPage()
          this.fetchImages(currentQuery, this.state.page).then(images => {
              this.addImages(images);
          });
      }
  }

  onLoadMore = () => {
      this.setState({inLoad: true})
      this.incrementPage()

      this.fetchImages(this.props.query, this.state.page).then(images => {
          this.addImages(images);
      });
      this.setState({inLoad: false})
  }

  render() {

      return (
          <>
              <ul className={css.galleryList}>
                  {this.state.images.map(
                      ({ id, webformatURL, largeImageURL }) => (
                          <ImageGalleryItem
                              key={id}
                              imageURL={webformatURL}
                              largeImageURL={largeImageURL}
                          />
                      )
                  )}
              </ul>
              {this.state.images.length !== 0 && (
                  <Button onLoadMore={this.onLoadMore} />
              )}
              {this.state.inLoad === true && (<Loader isOpen={this.state.inLoad}/>)}
              {this.state.images.length === 0 && (
                  <div className={css.noImagesText}>THERE`RE NO IMAGES YET</div>
              )}
          </>
      );
  }
}


export default ImageGallery;
