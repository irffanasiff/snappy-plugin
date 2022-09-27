import { useCallback, useEffect, useState } from 'react';

const useSlider = ({ value, ...config }) => {
  const [sliderVal, setSliderVal] = useState(value);

  const [configuration, setConfiguration] = useState(config);

  const onChange = useCallback((val) => {
    setSliderVal(val);
  }, []);

  useEffect(() => {
    setConfiguration({
      ...config,
      onChange,
      value: sliderVal,
    });
  }, [sliderVal]);

  return [sliderVal, configuration];
};

export default useSlider;
