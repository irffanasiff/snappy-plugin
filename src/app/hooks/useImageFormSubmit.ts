import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../context/app-context';
import { urlToBase64Image } from '../lib/base64ToArrayBuffer';

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
        setLoadingTimeImageToImage(100);
        const imgResponse = (await urlToBase64Image(response.data)) as {
          data: string;
          width: number;
          height: number;
        };
        parent.postMessage(
          {
            pluginMessage: {
              type: 'render-image',
              data: imgResponse.data,
              imgWidth: imgResponse.width,
              imgHeight: imgResponse.height,
            },
          },
          '*'
        );
        setLoadingTimeImageToImage(0);
        setWidthOfLoader(0);
        return;
      })
      .catch((err) => {
        setLoadingTimeImageToImage(100);
        console.log('Error while sending request to the server - ', err);
        setLoadingTimeImageToImage(0);
        setWidthOfLoader(0);
        return;
      });
  };

  return onSubmit;
};

export default useImageFormSubmit;
