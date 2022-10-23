import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../context/app-context';
import { base64ToArrayBuffer } from '../lib/base64ToArrayBuffer';

const useTextFormSubmit = ({ setWidthOfLoader, reset, user }) => {
  const { setLoadingTimeTextToImage, setFetchingData } = useContext(AppContext);
  //const { loading, setLoading } = useContext(AppContext);
  const random = Math.floor(Math.random() * 4) + 14;
  const onSubmit = async (data) => {
    console.log('form submitted - ', data);
    setLoadingTimeTextToImage(10 / random);
    // send a request to the api
    const postData = {
      data,
    };
    setFetchingData(true);
    console.log('request sent to the server - ', `Bearer ${user.token}`);
    axios
      .post(`https://snappysnappy.herokuapp.com/create/${user._id}`, postData, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(async (response) => {
        console.log('response - ', response.data);
        const arrayBuffer = base64ToArrayBuffer(response.data);
        console.log('array buffer - ', arrayBuffer);
        parent.postMessage({ pluginMessage: { type: 'render-image', data: arrayBuffer } }, '*');
        setLoadingTimeTextToImage(100);
      })
      .catch((err) => {
        setLoadingTimeTextToImage(100);
        console.log('Error while sending request to the server - ', err);
      })
      .finally(() => {
        setLoadingTimeTextToImage(0);
        console.log('timer set to 0');
        setWidthOfLoader(0);
        setFetchingData(false);
      });
  };

  return onSubmit;
};

export default useTextFormSubmit;
