import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className="gallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={onImageClick} // Передає onImageClick у ImageGalleryItem
          />
        ))}
      </ul>
    );
  }
}

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onImageClick: PropTypes.func.isRequired,
// };

export default ImageGallery;
