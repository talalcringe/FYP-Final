const getWordCount = (text) => {
  console.log('TEXT TO COUNT', text);
  const words = text.trim().split(/\s+/);
  return words.length;
};

export { getWordCount };
