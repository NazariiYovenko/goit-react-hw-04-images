import { ModalWraper, Overlay } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownCloseModal);
  }

  handleOverlayCloseModal = e => {
    const { onClose } = this.props;
    if (e.currentTarget !== e.target) {
      onClose();
    }
  };

  handleKeydownCloseModal = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayCloseModal}>
        <ModalWraper>{this.props.children}</ModalWraper>
      </Overlay>,
      modalRoot
    );
  }
}
