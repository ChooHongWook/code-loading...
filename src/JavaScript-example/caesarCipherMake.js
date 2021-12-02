function caesarCipher(str, encryptionNum) {
  if (str === '') {
    return '';
  }

  const lowers = 'abcdefghijklmnopqrstuvwxyz'
  let newArr = str.split('')
  let findIndex;
  let getUseIdx;
  let result = '';
  
  for (let i of newArr) {
    if (i === ' ') {
      result += ' '
      continue
    }
    findIndex = lowers.indexOf(i);
    getUseIdx = findIndex + encryptionNum
    
    while (getUseIdx < 0 || getUseIdx > 25) {
      if(getUseIdx < 0) {
        getUseIdx += 26
      } else if (getUseIdx > 25) {
        getUseIdx -= 26
      }
    }
    
    result += lowers[getUseIdx]
  }
  
  return result;
}


function decryptCaesarCipher(str, encryptionNum) {
  if (str === '') {
    return '';
  }

  const lowers = 'abcdefghijklmnopqrstuvwxyz'
  let newArr = str.split('')
  let findIndex;
  let getUseIdx;
  let result = '';
  
  for (let i of newArr) {
    if (i === ' ') {
      result += ' '
      continue
    }
    findIndex = lowers.indexOf(i);
    getUseIdx = findIndex - encryptionNum
    
    while (getUseIdx < 0 || getUseIdx > 25) {
      if(getUseIdx < 0) {
        getUseIdx += 26
      } else if (getUseIdx > 25) {
        getUseIdx -= 26
      }
    }
    
    result += lowers[getUseIdx]
  }
  
  return result;
}

console.log(caesarCipher('hello world', 3)) // khoor zruog

let test = caesarCipher('hello world', 3)
console.log(decryptCaesarCipher(test,3))  // hello world