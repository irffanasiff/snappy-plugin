import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../context/app-context';
import { base64ToArrayBuffer } from '../lib/base64ToArrayBuffer';

const useImageFormSubmit = ({ setWidthOfLoader, reset }) => {
  const { setLoadingTimeImageToImage, fetchingData, setFetchingData, user } = useContext(AppContext);
  //const { loading, setLoading } = useContext(AppContext);
  const random = Math.floor(Math.random() * 4) + 14;
  const onSubmit = async (data: any) => {
    console.log('form submitted - ', data);
    setLoadingTimeImageToImage(100 / random);
    // send a request to the api
    const postData = {
      data,
    };
    setFetchingData(true);
    axios
      .post(`https://snappysnappy.herokuapp.com/create/${user._id}`, postData, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(async (response) => {
        console.log('response - ', response.data);
        const arrayBuffer = await base64ToArrayBuffer(response.data);
        console.log('array buffer - ', arrayBuffer);
        parent.postMessage({ pluginMessage: { type: 'render-image', data: arrayBuffer } }, '*');
        setLoadingTimeImageToImage(100);
      })
      .catch((err) => {
        setLoadingTimeImageToImage(100);
        console.log('Error while sending request to the server - ', err);
      })
      .finally(() => {
        setLoadingTimeImageToImage(0);
        console.log('timer set to 0');
        setWidthOfLoader(0);
        setFetchingData(false);
      });
  };

  return onSubmit;
};

export default useImageFormSubmit;
