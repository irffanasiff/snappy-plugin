import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFormSubmit from '../../../hooks/useFormSubmit';
import useRenderImage from '../../../hooks/useRenderImage';
import SelectedNode from './SelectedNode/SelectedNode';
import AppContext from '../../../context/app-context';
import Customization from './Customizations/Customization';

import styles from './Render.module.scss';

const promptData = [
  'interior design, open plan, kitchen and living room, modular furniture, high ceiling',
  'a glass of beer with bottle with sign that saying baltika',
  'can of paint, minimal, modern',
  'Wes Anderson sneaker',
  'Analog close up frontal face portrait photography of a beautiful woman',
  'abstract advertising illustration for bmw ',
  'promotional photograph for an iphone, award winning photograph, studio lighting',
  'A whirlwind inside the metaverse',
];

const Render = () => {
  const [isPro, setIsPro] = useState(true);
  const [hover, setHover] = useState(false);
  const [widthOfLoader, setWidthOfLoader] = useState(0);
  const [promptPlaceholder, setPromptPlaceHolder] = useState(promptData[Math.floor(Math.random() * promptData.length)]);
  const [selection, setSelection] = useState({
    name: 'Select an area',
    data: { id: undefined, type: undefined },
  });
  const [image] = useRenderImage({ setSelection });
  const { loadingTime, isAuth } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({});
  const onSubmit = useFormSubmit({ setWidthOfLoader, reset });
  // const { loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    if (widthOfLoader <= 85) {
      setTimeout(() => {
        setWidthOfLoader((prevWidth) => prevWidth + loadingTime);
      }, 1000);
    } else if (widthOfLoader > 85 && widthOfLoader < 95) {
      return;
    } else if (widthOfLoader >= 95) {
      setWidthOfLoader(100);
      return;
    }
    // return () => {
    //   setWidthOfLoader(0);
    // };
  }, [widthOfLoader, loadingTime]);

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
          <div className={styles.vStack}>
            <p className={styles.input_label}>Prompt</p>
            <textarea
              placeholder={promptPlaceholder}
              className={styles.input_textarea}
              {...register('prompt', { required: true })}
            />
          </div>
          <Customization register={register} setValue={setValue} />
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
        </div>
        {isPro ? (
          <div className={styles.buttonContainer}>
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'absolute',
                width: `${widthOfLoader}%`,
                maxWidth: '287px',
                height: '2.55rem',
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
                style={{
                  zIndex: '10',
                  color: `${hover && widthOfLoader ? 'white' : 'black'}`,
                }}
              >
                {widthOfLoader ? 'Loading.. ' + parseInt(widthOfLoader as unknown as string) + '%' : 'Generate'}
              </p>
            </button>
          </div>
        ) : (
          <div className={`${styles.hStack} ${styles.nonProButtonContainer}`}>
            <div className={styles.buttonContainer}>
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute',
                  width: `${widthOfLoader / 1.33}%`,
                  maxWidth: '206px',
                  height: '2.45rem',
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
                  style={{ zIndex: '10', color: `${hover && widthOfLoader ? 'white' : 'black'}` }}
                >
                  {widthOfLoader == 100
                    ? 'Success ✓'
                    : widthOfLoader
                    ? 'Loading.. ' + parseInt((widthOfLoader % 1.33) as unknown as string) + '%'
                    : 'Generate'}
                </p>
              </button>
            </div>
            <button
              onClick={() => {
                //setIsPro((prevState) => !prevState);
                window.open('https://snapy-plugin.com/', '_blank');
              }}
              className={styles.getProButton}
            >
              <p>Go Pro</p>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Render;
