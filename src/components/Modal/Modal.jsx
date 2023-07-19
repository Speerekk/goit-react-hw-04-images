import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Modal extends Component {
  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { imageURL, onClose } = this.props;

    return (
      <div className="modal-overlay" onClick={this.handleOverlayClick}>
        <div className="modal-content">
          <img src={imageURL} alt="" className="modal-image" />
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

// Modal.propTypes = {
//   image: PropTypes.shape({
//     largeImageURL: PropTypes.string.isRequired,
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
// };

export default Modal;
