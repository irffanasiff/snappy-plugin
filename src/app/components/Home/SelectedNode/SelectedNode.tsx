import React from 'react';
import styles from './SelectedNode.module.scss';

const SelectedNode = (props: { selection: string }) => {
  return (
    <div>
      <p className={styles.form__input_label}>Selection</p>

      <p className={styles.form__input_label}>
        <span>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.4375 13V10.5625H0V9.5625H2.4375L2.4375 3.25H0V2.25H2.4375V0H3.4375V2.25H9.75V0H10.75V2.25H13V3.25H10.75V9.5625H13V10.5625H10.75V13H9.75V10.5625H3.4375V13H2.4375ZM9.75 9.5625V3.25H3.4375L3.4375 9.5625H9.75Z"
              fill="rgba(0, 0, 0, 0.8)"
              fill-opacity="0.8"
            />
          </svg>
        </span>{' '}
        {props.selection}
      </p>
    </div>
  );
};

export default SelectedNode;
