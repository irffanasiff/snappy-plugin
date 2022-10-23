import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/app-context';
import MenuOptions from './MenuOptions';
import styles from './Profile.module.scss';

const Profile = () => {
  const { user } = useContext(AppContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const onClickHandler = () => setShowMenu(!showMenu);
  useEffect(() => {
    console.log('user updated - ', user);
  }, [user]);

  return (
    <div>
      {showMenu && (
        <div className={styles.menuContainer}>
          <MenuOptions />
        </div>
      )}
      <button onClick={onClickHandler} className={styles.avatarButton}>
        <img src={user.picture} alt="circle" className={styles.avatar} onLoad={() => console.log('Loaded')} />
      </button>
    </div>
  );
};

export default Profile;
