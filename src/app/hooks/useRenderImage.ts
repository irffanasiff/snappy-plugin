import React, { useContext, useState } from 'react';
import AppContext from '../context/app-context';

const useRenderImage = ({ setSelection }) => {
  const [image, setImage] = useState() as any;
  const { fetchingData, setFetchingData } = useContext(AppContext);

  window.onmessage = async (event) => {
    switch (event.data.pluginMessage.type) {
      case 'selected_node':
        const selectedData: { name: string; data: { id: string; type: string } | undefined } = event.data.pluginMessage;
        if (selectedData.data) {
          setSelection(selectedData);
        } else {
          setSelection(selectedData);
        }
        break;
      case 'selected_node_bytes_data':
        const bytesData = event.data.pluginMessage.data;
        if (fetchingData) return;
        if (!bytesData) return setImage();
        const base64 = btoa(new Uint8Array(bytesData).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        setImage('data:image/svg+xml;base64,' + base64);
        break;
      default:
        break;
    }
  };
  return [image];
};

export default useRenderImage;
