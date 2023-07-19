import React, { useState, useEffect, useCallback } from 'react';
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

  const fetchImages = useCallback(() => {
    if (searchQuery.trim() === '') {
      return;
    }

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
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    setPage(1);
    setImages([]);
    setHasMore(true);
    fetchImages();
  }, [searchQuery, fetchImages]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = imageURL => {
    setSelectedImage(imageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {images.length > 0 && !isLoading && hasMore && (
        <Button onClick={handleLoadMore}>Загрузить еще</Button>
      )}
      {selectedImage && (
        <Modal imageURL={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
