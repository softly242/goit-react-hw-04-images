import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children, onClose, show }) {
  useEffect(() => {
    const handleEscapeClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeClick);
    return window.removeEventListener('keydown', handleEscapeClick);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) return null;
  return createPortal(
    <div onClick={handleBackdropClick} className="Overlay">
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}

/* class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeClick);
  }
  handleEscapeClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    if (!this.props.show) return null;
    return createPortal(
      <div onClick={this.handleBackdropClick} className="Overlay">
        <div className="Modal">{children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
 */
Modal.protoType = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
