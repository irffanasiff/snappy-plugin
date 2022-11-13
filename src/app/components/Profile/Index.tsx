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
        <img
          src={
            imgLoaded
              ? user.picture
              : 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'
          }
          className={styles.avatar}
          alt={user.username}
          onLoad={() => console.log('Loaded')}
        />
      </button>
    </div>
  );
};

export default Profile;
