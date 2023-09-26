const shuffleArray = (arr, currentIndex) => {
  if (currentIndex === 0) {
    return arr;
  }

  const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
  [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];

  return shuffleArray(arr, currentIndex - 1);
};

export default { shuffleArray };
