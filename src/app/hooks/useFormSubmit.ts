import axios from 'axios';
import { useContext, useState } from 'react';
import AppContext from '../context/app-context';
import { base64ToArrayBuffer, getBase64Image } from '../lib/base64ToArrayBuffer';

const useFormSubmit = ({ setWidthOfLoader, reset }) => {
  const { setLoadingTime } = useContext(AppContext);
  //const { loading, setLoading } = useContext(AppContext);
  const random = Math.floor(Math.random() * 4) + 14;
  const onSubmit = async (data) => {
    console.log('submitted data', data);
    setLoadingTime(100 / random);
    // send a request to the api
    const postData = {
      data,
    };
    axios
      .post('https://snappysnappy.herokuapp.com/create', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
      .then(async (response) => {
        console.log('time out is ');
        console.log('response - ', response.data);
        const arrayBuffer = await base64ToArrayBuffer(response.data);
        console.log('array buffer - ', arrayBuffer);
        parent.postMessage({ pluginMessage: { type: 'render-image', data: arrayBuffer } }, '*');
        setLoadingTime(100);
      })
      .catch((err) => {
        setLoadingTime(100);
        console.log('Error while sending request to the server - ', err);
      })
      .finally(() => {
        setLoadingTime(0);
        setWidthOfLoader(0);
      });
  };

  return onSubmit;
};

export default useFormSubmit;
