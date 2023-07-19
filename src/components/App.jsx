import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const API_KEY = '36809568-a0d5a67efa5c37ce2fdc5564f';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    fetchImages();
  }, [searchQuery]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const fetchImages = () => {
    setIsLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          setHasMore(false);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {images.length > 0 && !isLoading && hasMore && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
