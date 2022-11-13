import axios from 'axios';
import { useContext } from 'react';
import AppContext from '../context/app-context';
import { urlToBase64Image } from '../lib/base64ToArrayBuffer';

const useTextFormSubmit = ({ setWidthOfLoader, reset, user }) => {
  const { setFetchingData } = useContext(AppContext);
  //const { loading, setLoading } = useContext(AppContext);
  const random = Math.floor(Math.random() * 4) + 8; // this function returns a random number between 14 and 18

  // create a timer function which calculates the time taken by request
  
  const onSubmit = async (data) => {
    console.log('on submit called');
    setWidthOfLoader((prevState) => prevState + 10 / random);
    const postData = {
      data,
    };
    console.log('form submitted - ', postData);
    setFetchingData(true);

    axios
      .post(`https://snappysnappy.herokuapp.com/create/${user._id}`, postData, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(async (response) => {
        console.log('server response ')
        const imgResponse = (await urlToBase64Image(response.data)) as {
          data: string;
          width: number;
          height: number;
        };
        setWidthOfLoader(100);
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
        return;
      })
      .catch((err) => {
        setWidthOfLoader(100);
        console.log('Error while sending request to the server - ', err);
        return;
      });
  };

  return onSubmit;
};

export default useTextFormSubmit;
