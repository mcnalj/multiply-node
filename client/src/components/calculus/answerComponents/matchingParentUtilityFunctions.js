function populateQuestionArray (matchesArray, arrayLength=5, includeLevel1=true, includeLevel2=false, includeLevel3=false) {

    const levels = [];
    if (includeLevel1) levels.push(1);
    if (includeLevel2) levels.push(2);
    if (includeLevel3) levels.push(3);
  
    const filteredArray = matchesArray.filter(obj => levels.includes(obj.level));
    return shuffle(filteredArray).slice(0, arrayLength);
  }
  
  function shuffle(array) {
    for (let i=array.length -1; i>0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function setOptions(array) {
    const leftOptions = shuffle(array.map(item => item.leftLatex));
    const rightOptions = shuffle(array.map(item => item.rightLatex));
    return {leftOptions, rightOptions};
  }

  export {
    populateQuestionArray,
    setOptions
  }
  
  
  
  