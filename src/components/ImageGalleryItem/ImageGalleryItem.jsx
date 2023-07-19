import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  handleImageClick = () => {
    const { image, onImageClick } = this.props;
    onImageClick(image.largeImageURL);
  };

  render() {
    const { image } = this.props;

    return (
      <li className="gallery-item">
        <img
          src={image.webformatURL}
          alt=""
          className="gallery-item__image"
          onClick={this.handleImageClick}
          style={{ height: '300px' }}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
