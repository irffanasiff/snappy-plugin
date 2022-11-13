import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTextFormSubmit from '../../../hooks/useTextFormSubmit';
import useRenderImage from '../../../hooks/useRenderImage';
import SelectedNode from './SelectedNode/SelectedNode';
import AppContext from '../../../context/app-context';
import Customization from './Customizations/Customization';
import Modal from '../../Modal/Index';

import styles from './Render.module.scss';
import Inspirations from './Inspirations';

const Render = () => {
  const [widthOfLoader, setWidthOfLoader] = useState(0);
  const [inspirationVisibility, setInspirationVisibility] = useState(false);
  const [selection, setSelection] = useState({
    name: 'Select an area',
    data: { id: undefined, type: undefined },
  });

  const { openModal, user, multipleGenerations, setMultipleGenerations } = useContext(AppContext);
  const { register, handleSubmit, reset, setValue, control, watch } = useForm({});

  const image = useRenderImage({ setSelection });
  const onSubmit = useTextFormSubmit({ setWidthOfLoader, reset, user });

  useEffect(() => {
    console.log('multiple generations - ', multipleGenerations);
    setValue('multiple_generations', multipleGenerations);
  }, [multipleGenerations]);

  useEffect(() => {
    console.log('widthOfLoader,  ', widthOfLoader);
    if (widthOfLoader > 0 && widthOfLoader < 98) {
      setTimeout(() => {
        setWidthOfLoader((prevWidth) => prevWidth + 1);
      }, 100);
      return;
    } else if (widthOfLoader === 98) {
      return;
    } else if (widthOfLoader === 99) {
      setWidthOfLoader(100);
      return;
    } else if (widthOfLoader >= 100) {
      setWidthOfLoader(0);
      return;
    }
  }, [widthOfLoader]);

  useEffect(() => {
    if (watch('prompt').length > 0) {
      setInspirationVisibility(false);
    }
  }, [watch('prompt')]);

  return (
    <>
      {openModal.isOpen && <Modal />}
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.vStack} ${styles.form}`}>
          <div className={`${styles.vStack} ${styles.gap}`}>
            <div onMouseLeave={() => setInspirationVisibility(false)} className={styles.vStack}>
              <p className={styles.input_label}>Prompt</p>
              <textarea
                onClickCapture={() => setInspirationVisibility(true)}
                placeholder={'A detailed description about the image'}
                className={styles.input_textarea}
                {...register('prompt', { required: true })}
              />
              <div
                style={{ display: `${inspirationVisibility ? 'flex' : 'none'}` }}
                className={styles.inspirationSectionContainer}
              >
                <p className={styles.inspirationHeading}>Need Inspiration ?</p>
                <Inspirations setValue={setValue} />
              </div>
            </div>
            <Customization register={register} setValue={setValue} control={control} />
            <SelectedNode selection={selection.name} />
            <div className={styles.hStackSelection}>
              <span className={styles.input_label}>Number of outputs</span>
              <span>
                <select {...register('num_outputs')}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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
                  //  onMouseEnter={handleMouseEnter}
                  //  onMouseLeave={handleMouseLeave}
                  style={{
                    position: 'absolute',
                    width: `${widthOfLoader}%`,
                    maxWidth: '303px',
                    height: '2.25rem',
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
                    //  onMouseEnter={handleMouseEnter}
                    //  onMouseLeave={handleMouseLeave}
                    style={{
                      zIndex: '10',
                    }}
                  >
                    {widthOfLoader > 1
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
    </>
  );
};

export default Render;
