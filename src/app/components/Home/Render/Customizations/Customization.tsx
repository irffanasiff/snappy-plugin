import React, { useEffect, useState } from 'react';
import useSlider from '../../../../hooks/useSlider';
import RangeSlider from '../../../RangeSlider/RangeSlider';
import Select, { components, StylesConfig } from 'react-select';
import { colorStyles } from './colorStyles';
import styles from './customization.module.scss';

import 'react-multiple-select-dropdown-lite/dist/index.css';
import { Controller } from 'react-hook-form';

const options = [
  { value: 'realistic', label: 'realistic' },
  { value: 'cyberpunk', label: 'cyberpunk' },
  { value: '8k', label: '8k' },
  { value: 'hyperealistic', label: 'hyperealistic' },
  { value: 'digital art', label: 'digital art' },
  { value: 'highly saturated colors', label: 'highly saturated colors' },
  { value: 'illustration', label: 'illustration' },
  { value: 'depth of field', label: 'depth of field' },
  { value: 'mood lighting', label: 'mood lighting' },
  { value: 'octane engine', label: 'octane engine' },
  { value: 'unreal engine', label: 'unreal engine' },
  { value: 'dramatic light', label: 'dramatic light' },
  { value: '8 k post – production', label: '8 k post – production' },
];

const DropdownIndicator = (props) => {
  return <components.DropdownIndicator {...props}>▾</components.DropdownIndicator>;
};

const CrossIcon = (props) => {
  return (
    <components.CrossIcon {...props}>
      <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 0.411987L1 4.41199M1 0.412018L5 4.41199"
          stroke="#BDBDBD"
          stroke-width="0.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </components.CrossIcon>
  );
};
const Customization = ({ register, setValue, control }) => {
  const [selectedOptions, setSelectedOptions] = useState();
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
          <div className={`${styles.vStack} ${styles.modifiersContainer}`}>
            <p className={styles.input_label}>Seed</p>
            <input placeholder={'Seed Number'} className={styles.seedInput} {...register('seed')} />
          </div>
          <div className={`${styles.vStack} ${styles.modifiersContainer}`}>
            <p className={styles.input_label}>Style Modifiers</p>
            <Controller
              control={control}
              name="categories"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={options}
                  styles={colorStyles}
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  // isLoading={isLoading}
                  placeholder={'Add Style Modifiers'}
                  onChange={onChange}
                  isMulti={true}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Customization;
