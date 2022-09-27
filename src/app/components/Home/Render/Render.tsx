import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../../context/app-context';
import { useInterval } from '../../../hooks/useInterval';
import useFormSubmit from '../../../hooks/useRenderFormSubmit';
import useRenderImage from '../../../hooks/useRenderImage';
import useSlider from '../../../hooks/useSlider';
import RangeSlider from '../../RangeSlider/RangeSlider';
import SelectedNode from '../SelectedNode/SelectedNode';
import styles from './Render.module.scss';

const Render = () => {
  const [selection, setSelection] = useState({ name: 'Frame', data: { id: undefined, type: undefined } });
  const [image] = useRenderImage({ setSelection });
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    setCounter(counter + 40);
  }, 4000);

  const onSubmit = useFormSubmit();
  // const { loading, setLoading } = useContext(AppContext);

  const [slider, sliderConfig] = useSlider({
    min: 0,
    max: 100,
    value: 50,
    step: 1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  console.log(errors);

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.VStack} ${styles.form}`}>
        <div className={styles.VStack}>
          <p className={styles.form__input_label}>Prompt</p>
          <textarea
            placeholder="Enter descriptions of image here"
            className={styles.form__input_textarea}
            {...register('prompt', { required: true, min: 4, maxLength: 100 })}
          />
        </div>
        <div className={styles.VStackSlider}>
          <p className={styles.form__input_label}>Prompt Strength</p>
          <RangeSlider {...sliderConfig} classes="additional-css-classes" {...register('prompt_strength', {})} />
          <hr />
        </div>
        <SelectedNode selection={selection.name} />
        <div className={styles.HStackSelection}>
          <span className={styles.form__input_label}>Number of outputs</span>
          <span>
            <select {...register('num_outputs')}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </span>
        </div>
        {/* <div className={styles.HStack}>
          <span className={styles.form__input_label}>Output Size</span>
          <span>
            <select {...register('Output Size')}>
              <option value="Small">Small</option>
              <option value=" Medium"> Medium</option>
              <option value=" Large"> Large</option>
            </select>
          </span>
        </div> */}
        <div className={styles.buttonContainer}>
          <button
            style={{
              position: 'absolute',
              width: `${counter}px`,
              maxWidth: '274px',
              height: '2.55rem',
              backgroundColor: 'rgba(181, 181, 39, 0.4)',
              marginTop: '20px',
              border: 'none',
              borderRadius: '4px',
              transition: 'all 0.4s ease-in-out',
            }}
          />
          <button className={styles.button} />
        </div>
      </form>
    </div>
  );
};

export default Render;
