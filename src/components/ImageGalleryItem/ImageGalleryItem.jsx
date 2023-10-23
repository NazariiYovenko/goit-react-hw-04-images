import Modal from 'components/Modal/Modal';
import {
  ImageGalleryItemImage,
  ImageGalleryItemWrapper,
} from './ImageGalleryItem.styled';

import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { id, largeImageURL, webformatURL, tags } = this.props;
    return (
      <ImageGalleryItemWrapper onClick={this.toggleModal}>
        <ImageGalleryItemImage id={id} src={webformatURL} alt={tags} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageGalleryItemWrapper>
    );
  }
}
