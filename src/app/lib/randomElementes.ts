export var getMeRandomElements = function (sourceArray, neededElements) {
  const res = [];
  for (let i = 0; i < neededElements; ) {
    const random = Math.floor(Math.random() * sourceArray.length);
    if (res.indexOf(sourceArray[random]) !== -1) {
      continue;
    }
    res.push(sourceArray[random]);
    i++;
  }
  return res;
};
