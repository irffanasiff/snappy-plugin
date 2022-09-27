import React, { useState } from 'react';

const useRenderImage = ({ setSelection }) => {
  const [image, setImage] = useState<string | null>(null);

  window.onmessage = async (event) => {
    const selectedData: { name: string; data: { id: string; type: string } | undefined } = event.data.pluginMessage;
    if (selectedData.data) {
      setSelection(selectedData);
      console.log(selectedData);
    } else {
      setSelection(selectedData);
    }
  };
  return [image];
};

export default useRenderImage;
