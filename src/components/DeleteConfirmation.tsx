import { DeleteConfirmationProps } from '../types';
import ProggressBar from './ProggressBar';

const TIMER = 3000;

const DeleteConfirmation = ({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) => {
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProggressBar timer={TIMER} onCancel={onCancel} />
    </div>
  );
};

export default DeleteConfirmation;
