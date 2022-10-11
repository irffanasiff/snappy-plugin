export function base64ToArrayBuffer(base64: any) {
  var binary_string = window.atob(base64.replace(/^data:image\/(png|jpg);base64,/, ''));
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export const getBase64Image = (url: string) => {
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
      resolve(bytesBuffer);
    };
    img.src = url;
  });
};
