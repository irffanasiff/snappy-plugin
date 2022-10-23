import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInterval } from '../../../hooks/useInterval';
import useRenderImage from '../../../hooks/useRenderImage';
import useSlider from '../../../hooks/useSlider';
import AppContext from '../../../context/app-context';
import RangeSlider from '../../RangeSlider/RangeSlider';
import useImageFormSubmit from '../../../hooks/useImageFormSubmit';

import styles from './imageTab.module.scss';

const ImageTab = () => {
  const [hover, setHover] = useState(false);
  const [widthOfLoader, setWidthOfLoader] = useState(0);
  const [selection, setSelection] = useState({
    name: 'Select an area',
    data: { id: undefined, type: undefined },
  });
  const [image] = useRenderImage({ setSelection });
  const { loadingTimeImageToImage, isAuth, user, setUser, fetchingData, setFetchingData } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({});
  const onSubmit = useImageFormSubmit({ setWidthOfLoader, reset });

  const [slider, sliderConfig] = useSlider({
    min: 0,
    max: 0.99,
    value: 0.5,
    step: 0.01,
  });

  useEffect(() => {
    if (widthOfLoader <= 85) {
      setTimeout(() => {
        setWidthOfLoader((prevWidth) => prevWidth + loadingTimeImageToImage);
      }, 1000);
    } else if (widthOfLoader > 85 && widthOfLoader < 95) {
      return;
    } else if (widthOfLoader >= 95) {
      setWidthOfLoader(100);
      return;
    }
  }, [widthOfLoader, loadingTimeImageToImage]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  useEffect(() => {
    if (fetchingData) return;
    if (image) {
      parent.postMessage({ pluginMessage: { type: 'increase-height' } }, '*');
    } else {
      parent.postMessage({ pluginMessage: { type: 'decrease-height' } }, '*');
    }
  }, [image]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.vStack} ${styles.form}`}>
        {/* <input type="image" {...register('image', { required: true })} /> */}
        {image ? (
          <div className={styles.selectedImageContainer}>
            <img
              className={styles.selectedImage}
              src={image}
              alt="canvas"
              {...register('init_image', { value: image })}
            />
          </div>
        ) : (
          <div className={styles.selectImageContainer}>
            <p className={styles.selectImageText}>Select an Image or Vector</p>
          </div>
        )}
        <div className={`${styles.vStack} ${styles.gap}`}>
          <div className={styles.vStack}>
            <p className={styles.input_label}>Prompt</p>
            <textarea
              placeholder="Enter the Prompt"
              className={styles.input_textarea}
              {...register('prompt', { required: true })}
            />
          </div>
        </div>
        <div className={`${styles.vStack}`}>
          <p className={styles.input_label}>Prompt Strength</p>
          <RangeSlider
            {...sliderConfig}
            classes="additional-css-classes"
            register={register}
            name={'prompt_strength'}
          />
        </div>
        <div className={styles.buttonMainContainer}>
          {/* {user.isPro ? ( */}
          <div className={styles.proButtonContainer}>
            <div className={styles.buttonContainer}>
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute',
                  width: `${widthOfLoader}%`,
                  maxWidth: '206px',
                  height: '2.22rem',
                  backgroundColor: 'rgba(181, 181, 39, 0.4)',
                  border: 'none',
                  padding: '0px',
                  borderRadius: '4px',
                  transition: 'all 0.4s ease-in-out',
                }}
              />
              <button type="submit" className={styles.button} style={{ backgroundColor: '#ffff1e' }}>
                <p
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ zIndex: '10', color: `${hover && widthOfLoader ? 'white' : 'black'}`, fontWeight: '300' }}
                >
                  {widthOfLoader ? 'Loading.. ' + parseInt(widthOfLoader) + '%' : 'Generate Image'}
                </p>
              </button>
            </div>
          </div>
          {/*  ) : (
            <div className={`${styles.hStack} ${styles.nonProButtonContainer}`}>
              <div className={styles.buttonContainerStack}>
                <button
                  type="submit"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: 'absolute',
                    width: `${widthOfLoader}%`,
                    maxWidth: '206px',
                    height: '2.22rem',
                    backgroundColor: 'rgba(181, 181, 39, 0.4)',
                    border: 'none',
                    padding: '0px',
                    borderRadius: '4px',
                    transition: 'all 0.4s ease-in-out',
                  }}
                />
                <button type="submit" className={styles.nonProButton} style={{ backgroundColor: '#ffff1e' }}>
                  <p
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ zIndex: '10', color: `${hover && widthOfLoader ? 'white' : 'black'}`, fontWeight: '300' }}
                  >
                    {widthOfLoader ? 'Loading.. ' + parseInt(widthOfLoader) + '%' : 'Generate Image'}
                  </p>
                </button>
              </div>
              <button
                onClick={() => {
                  //setIsPro((prevState) => !prevState);
                  window.open('https://snappy-plugin.com/', '_blank');
                }}
                className={styles.getProButton}
              >
                <p>Go Pro</p>
              </button>
            </div>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default ImageTab;
