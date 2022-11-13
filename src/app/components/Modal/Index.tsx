import React, { useContext } from 'react';
import { IModal } from '../../../../typings/Definitions';
import styles from './Modal.module.scss';
import AppContext from '../../context/app-context';

const Modal = () => {
  const { openModal, setOpenModal } = useContext(AppContext);
  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() =>
          setOpenModal((prevState: IModal) => {
            return { ...prevState, isOpen: false };
          })
        }
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>👀</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() =>
              setOpenModal((prevState: IModal) => {
                return { ...prevState, isOpen: false };
              })
            }
          >
            ✕
          </button>
          <div className={styles.modalContent}>
            Looks like somebody has exceeded the free limit. We have a unlimited Plan too.
          </div>
          <button
            className={styles.deleteBtn}
            onClick={() =>
              setOpenModal((prevState: IModal) => {
                return { ...prevState, isOpen: false };
              })
            }
          >
            Get Subscription
          </button>
        </div>
      </div>
    </>
  );
};
export default Modal;
