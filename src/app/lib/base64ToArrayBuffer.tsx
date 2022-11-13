export function base64ToArrayBuffer(base64: any) {
  var binary_string = window.atob(base64.replace(/^data:image\/(png|jpg);base64,/, ''));
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
export const urlToBase64Image = (url: string) => {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  return new Promise(async (resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalHeight;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('');
      resolve({ data: dataURL, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;
  });
};

export const getUint8FromURL = (url: string) => {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  return new Promise(async (resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      const bytesBuffer = base64ToArrayBuffer(dataURL);
      // const bytesBuffer = figma.base64Decode(dataURL);
      resolve(bytesBuffer);
    };
    img.src = url;
  });
};

export const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
