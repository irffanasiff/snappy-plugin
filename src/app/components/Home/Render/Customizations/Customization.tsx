import React, { useEffect, useState } from 'react';
import useSlider from '../../../../hooks/useSlider';
import RangeSlider from '../../../RangeSlider/RangeSlider';

import styles from './customization.module.scss';

import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';

const options = [
  { label: 'Option 1', value: 'option_1' },
  { label: 'Option 2', value: 'option_2' },
  { label: 'Option 3', value: 'option_3' },
  { label: 'Option 4', value: 'option_4' },
];

const Customization = ({ register, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [slider1, sliderConfig1] = useSlider({
    min: 0,
    max: 20,
    value: 7.5,
    step: 0.1,
  });
  const [slider2, sliderConfig2] = useSlider({
    min: 0,
    max: 500,
    value: 50,
    step: 1,
  });

  const handleOnchange = (val) => {
    //setvalue(val);
  };

  useEffect(() => {
    if (isOpen) {
      parent.postMessage({ pluginMessage: { type: 'increase-height' } }, '*');
    } else {
      parent.postMessage({ pluginMessage: { type: 'decrease-height' } }, '*');
    }
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <div className={`${styles.hStack} ${styles.heading}`} onClick={() => setIsOpen((prevState) => !prevState)}>
        <div
          style={{
            fontSize: '18px',
            padding: '6px',
            //color: '#a1a1a1',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(180deg)',
            transition: 'all 0.4s',
          }}
        >
          ⌃
        </div>
        <p className={`${styles.input_label_heading} ${styles.toggle}`}>Customize</p>
      </div>
      {isOpen && (
        <div className={`${styles.vStack} ${styles.toggleContainer}`}>
          <div className={`${styles.hStack}  ${styles.flex}`}>
            <div className={styles.hStack}>
              <p className={styles.input_label}>Width</p>
              <select {...register('width')}>
                <option value="128">128</option>
                <option value="256">256</option>
                <option value="512" selected>
                  512
                </option>
                <option value="768">768</option>
                <option value="1024">1024</option>
              </select>
            </div>
            <div className={styles.hStack}>
              <p className={styles.input_label}>Height</p>
              <select {...register('height')}>
                <option value="128">128</option>
                <option value="256">256</option>
                <option value="512" selected>
                  512
                </option>
                <option value="768">768</option>
                <option value="1024">1024</option>
              </select>
            </div>
          </div>
          <div className={`${styles.stackSlider} ${styles.hStack}`}>
            <p className={styles.input_label}>Guidance Scale</p>
            <RangeSlider
              {...sliderConfig1}
              classes="additional-css-classes"
              register={register}
              name={'guidance_scale'}
            />
          </div>
          <div className={`${styles.stackSlider} ${styles.hStack}`}>
            <p className={styles.input_label}>Inference Steps</p>
            <RangeSlider
              {...sliderConfig2}
              classes="additional-css-classes"
              register={register}
              name={'num_inference_steps'}
            />
          </div>
          <div className={`${styles.hStack}  ${styles.flex}`}>
            <p className={styles.input_label}>Seed</p>
            <input placeholder={'Seed Number'} className={styles.seedInput} {...register('seed')} />
          </div>
          {/* <div className={`${styles.vStack} ${styles.modifiersContainer}`}>
            <p className={styles.input_label}>Style Modifiers</p>
            <MultiSelect className={styles.multiSelect} onChange={handleOnchange} options={options} />
          </div> */}
        </div>
      )}
    </div>
  );
};
export default Customization;
