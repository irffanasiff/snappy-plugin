import React, { useState } from 'react';

const useRenderImage = ({ setSelection }) => {
  const [image, setImage] = useState() as any;
  window.onmessage = async (event) => {
    console.log('event - ', event.data.pluginMessage);
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
