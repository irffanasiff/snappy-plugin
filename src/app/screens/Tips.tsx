import styles from './tips.module.scss';

import React from 'react';
const tipsText = [
  "Mention styles like 'pixel art'",
  "Add 'digital art' for striking and high-quality images",
  'Ask for images in the style of your favorite artist',
];
const text = tipsText[Math.floor(Math.random() * tipsText.length)];

const Tips = () => {
  return (
    <div className={styles.container}>
      <p>{text}</p>
    </div>
  );
};

export default Tips;
