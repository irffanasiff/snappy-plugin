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
          src="https://i.pinimg.com/236x/cc/50/ca/cc50cada4658669e26f818405cc7016b.jpg"
          alt="circle"
          className={styles.avatar}
        />
      </button>
    </div>
  );
};

export default Profile;
