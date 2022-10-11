import React, { useState } from 'react';
import MenuOptions from './MenuOptions';
import styles from './Profile.module.scss';

const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const onClickHandler = () => setShowMenu(!showMenu);

  return (
    <div>
      {showMenu && (
        <div className={styles.menuContainer}>
          <MenuOptions />
        </div>
      )}
      <button onClick={onClickHandler} className={styles.avatarButton}>
        <img
          src="https://64.media.tumblr.com/0efae5aa554409c093576ca158217314/a951a5713c4981b1-32/s400x600/79d5319b340848705751bd5d9a1e1c7d55fce97c.png"
          alt="circle"
          className={styles.avatar}
        />
      </button>
    </div>
  );
};

export default Profile;
