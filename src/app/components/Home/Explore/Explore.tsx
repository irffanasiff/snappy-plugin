import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import styles from './explore.module.scss';
import { getBase64Image } from '../../../lib/base64ToArrayBuffer';

const Explore = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('spaceship in space starwars like');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setSearchQuery(data.query);
  });

  const onClickHandler = async (url) => {
    const bufferImg = (await getBase64Image(url)) as ArrayBuffer;
    parent.postMessage({ pluginMessage: { type: 'lexica-image-url', data: new Uint8Array(bufferImg) } }, '*');
  };

  useEffect(() => {
    axios
      .get(`https://lexica.art/api/v1/search?q=${searchQuery}`)
      .then((response) => {
        console.log(response.data.images);
        setImages(response.data.images);
        console.log('images = ', images);
      })
      .catch((err) => console.log(err));
  }, [searchQuery]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.hStack} ${styles.nonProButtonContainer}`}>
          <input
            {...register('query', { required: true })}
            className={styles.inputBox}
            type="text"
            placeholder="Search images generated by others"
          />
          <button className={styles.searchButton}>
            <p>Search</p>
          </button>
        </div>
      </form>
      <div className={styles.image_gallery_container}>
        <ul className={styles.image_gallery}>
          {images.map((img) => (
            <li onClick={() => onClickHandler(`https://image.lexica.art/md/${img.id}`)} className={styles.image_item}>
              <img src={`https://image.lexica.art/sm/${img.id}`} alt={img.prompt} />
              <div className={styles.overlay}>
                <span>{img.prompt}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Explore;
