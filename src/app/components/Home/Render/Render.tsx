import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTextFormSubmit from '../../../hooks/useTextFormSubmit';
import useRenderImage from '../../../hooks/useRenderImage';
import SelectedNode from './SelectedNode/SelectedNode';
import AppContext from '../../../context/app-context';
import Customization from './Customizations/Customization';

import styles from './Render.module.scss';

const Render = () => {
  const [hover, setHover] = useState(false);
  const [widthOfLoader, setWidthOfLoader] = useState(0);
  const [inspirationVisibility, setInspirationVisibility] = useState(false);
  const [promptValue, seTPromptValue] = useState();
  // const [promptPlaceholder, setPromptPlaceHolder] = useState(promptData[Math.floor(Math.random() * promptData.length)]);
  const [selection, setSelection] = useState({
    name: 'Select an area',
    data: { id: undefined, type: undefined },
  });
  const { loadingTimeTextToImage, isAuth, user, setUser, multipleGenerations, setMultipleGenerations } =
    useContext(AppContext);
  const { register, handleSubmit, reset, setValue, control, watch, } = useForm({});
  const image = useRenderImage({ setSelection });
  const onSubmit = useTextFormSubmit({ setWidthOfLoader, reset, user });
  // const { loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    console.log('multiple generations - ', multipleGenerations);
    setValue('multiple_generations', multipleGenerations);
  }, [multipleGenerations]);

  useEffect(() => {
    if (widthOfLoader < 98) {
      setTimeout(() => {
        setWidthOfLoader((prevWidth) => prevWidth + loadingTimeTextToImage);
      }, 100);
    } else if (widthOfLoader === 98) {
      return;
    } else if (widthOfLoader >= 99) {
      setWidthOfLoader(100);
      return;
    }
    // return () => {
    //   setWidthOfLoader(0);
    // };
  }, [widthOfLoader, loadingTimeTextToImage]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.vStack} ${styles.form}`}>
        <div className={`${styles.vStack} ${styles.gap}`}>
          <div onMouseLeave={() => setInspirationVisibility(false)} className={styles.vStack}>
            <p className={styles.input_label}>Prompt</p>
            <textarea
              onClickCapture={() => setInspirationVisibility(true)}
              placeholder={'A detailed description about the image'}
              value={promptValue}
              className={styles.input_textarea}
              {...register('prompt', { required: true })}
            />
            <div
              style={{ display: `${inspirationVisibility ? 'flex' : 'none'}` }}
              className={styles.inspirationSectionContainer}
            >
              <p className={styles.inspirationHeading}>Need Inspiration ?</p>
              <div
                onClick={() => {
                  setValue('prompt', 'A Panda riding a bike through a city with depth of field');
                }}
                className={styles.inspirationHStack}
              >
                <p className={styles.inspirationText}>A Panda riding a bike through a city with depth of field</p>
                <p className={styles.inspirationIcon}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 1L4 7" stroke="#686868" stroke-width="0.5" strokeLinecap="round" />
                    <path d="M1 4H7" stroke="#686868" stroke-width="0.5" strokeLinecap="round" />
                  </svg>
                </p>
              </div>
              <div
                onClick={() => {
                  setValue('prompt', 'Photograph of mount katahdin with a beautiful lake, 35mm, sharp, golden hour');
                }}
                className={styles.inspirationHStack}
              >
                <p className={styles.inspirationText}>
                  Photograph of mount katahdin with a beautiful lake, 35mm, sharp, golden hour
                </p>
                <p className={styles.inspirationIcon}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 1L4 7" stroke="#686868" stroke-width="0.5" strokeLinecap="round" />
                    <path d="M1 4H7" stroke="#686868" stroke-width="0.5" strokeLinecap="round" />
                  </svg>
                </p>
              </div>
              <div
                onClick={() => {
                  setValue(
                    'prompt',
                    'New york city, dust storm, cinematic, dramatic, composition, sunny sky, brutalist, hyper realistic,                  epic scale, sense of awe, hypermaximalist, insane level of details, artstation HQ'
                  );
                }}
                className={styles.inspirationHStack}
              >
                <p className={styles.inspirationText}>
                  New york city, dust storm, cinematic, dramatic, composition, sunny sky, brutalist, hyper realistic,
                  epic scale, sense of awe, hypermaximalist, insane level of details, artstation HQ
                </p>
                <p className={styles.inspirationIcon}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 1L4 7" stroke="#686868" stroke-width="0.5" strokeLinecap="round" />
                    <path d="M1 4H7" stroke="#686868" stroke-width="0.5" strokeLinecap="round" />
                  </svg>
                </p>
              </div>
            </div>
          </div>
          <Customization register={register} setValue={setValue} control={control} />
          <SelectedNode selection={selection.name} />
          <div className={styles.hStackSelection}>
            <span className={styles.input_label}>Number of outputs</span>
            <span>
              <select {...register('num_outputs')}>
                <option value="1">1</option>
                <option value="4">4</option>
              </select>
            </span>
          </div>
          <div className={styles.hStackSelection}>
            <span className={styles.input_label}>Multiple Generations</span>
            <input type="checkbox" id="switch" />
            <label
              onClick={() => {
                setMultipleGenerations((prevState: boolean) => !prevState);
              }}
              htmlFor="switch"
            >
              Toggle
            </label>
          </div>
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
                    maxWidth: '303px',
                    height: '2.22rem',
                    backgroundColor: 'rgba(181, 181, 39, 0.4)',
                    border: 'none',
                    padding: '0px',
                    borderRadius: '04px 0px 0px 4px',
                    transition: 'all 0.5s ease-in-out',
                  }}
                />
                <button
                  type="submit"
                  className={styles.button}
                  style={{ backgroundColor: '#ffff1e', fontWeight: '300 !important' }}
                >
                  <p
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      zIndex: '10',
                      color: `${hover && widthOfLoader ? 'white' : 'black'}`,
                    }}
                  >
                    {widthOfLoader
                      ? 'Loading.. ' + parseInt(widthOfLoader as unknown as string) + '%'
                      : 'Generate Image'}
                  </p>
                </button>
              </div>
            </div>
       {/*   ) : (
            <div className={`${styles.hStack} ${styles.nonProButtonContainer}`}>
              <div className={styles.buttonContainerStack}>
                <button
                  type="submit"
                  //  onMouseEnter={handleMouseEnter}
                  //  onMouseLeave={handleMouseLeave}
                  style={{
                    position: 'absolute',
                    width: `${widthOfLoader / 1.33}%`,
                    maxWidth: '206px',
                    height: '2.22rem',
                    backgroundColor: 'rgba(181, 181, 39, 0.4)',
                    border: 'none',
                    padding: '0px',
                    borderRadius: '4px',
                    transition: 'all 0.4s ease-in-out',
                    cursor: 'not-allowed !important',
                  }}
                />
                <button type="submit" className={styles.nonProButton} style={{ backgroundColor: '#ffff1e' }}>
                  <p
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ zIndex: '10', color: `${hover && widthOfLoader ? 'white' : 'black'}`, fontWeight: '300' }}
                  >
                    {widthOfLoader == 100
                      ? 'Success ✓'
                      : widthOfLoader
                      ? 'Loading.. ' + parseInt((widthOfLoader % 1.33) as unknown as string) + '%'
                      : 'Generate Image'}
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
          )}*/}
        </div>
      </form>
    </div>
  );
};

export default Render;
