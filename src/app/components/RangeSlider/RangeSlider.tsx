import React, { memo, useEffect, useState } from 'react';
import styles from './RangeSlider.module.scss';

const RangeSlider = memo(({ classes, label, onChange, value, ...sliderProps }: any) => {
  const [sliderVal, setSliderVal] = useState(0);
  const [mouseState, setMouseState] = useState(null);

  useEffect(() => {
    setSliderVal(value);
  }, [value]);

  const changeCallback = (e) => {
    setSliderVal(e.target.value);
  };

  useEffect(() => {
    if (mouseState === 'up') {
      onChange(sliderVal);
    }
  }, [mouseState]);

  return (
    <div className={styles.range_slider}>
      <output htmlFor={''}>{sliderVal}</output>
      <input
        type="range"
        value={sliderVal}
        {...sliderProps}
        className={`slider ${classes}`}
        id="myRange"
        onChange={changeCallback}
        onMouseDown={() => setMouseState('down')}
        onMouseUp={() => setMouseState('up')}
      />
    </div>
  );
});

export default RangeSlider;
