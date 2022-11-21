import { createPortal } from 'react-dom';

export default function Portal(props) {
  return createPortal(props.children, document.getElementById('portal'))
}
