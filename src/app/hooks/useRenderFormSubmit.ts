import { useContext, useState } from 'react';
import AppContext from '../context/app-context';

const useFormSubmit = () => {
  const [loader, setLoader] = useState({ loader: false, estTime: 0 });
  const { loading, setLoading } = useContext(AppContext);

  const onSubmit = (data: { prompt: string; prompt_strength: string; num_outputs: string }) => {
    console.log(data);
    setLoader({ loader: true, estTime: 10000 });
    setLoading(true);
    setTimeout(() => {
      setLoader({ loader: false, estTime: 0 });
      setLoading(false);
    }, loader.estTime);
  };

  return onSubmit;
};

export default useFormSubmit;
