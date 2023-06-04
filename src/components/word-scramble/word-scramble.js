import React, {useState, useEffect} from 'react'
import './word-scramble.sass'

const WORDS = [
"React",
"Next",
"Website",
"Engineer",
"Typescript",
"Developer",
"Dream Job", 
"Time to code",
];

const WordScramble = () => {
  const [inputValue, setInputValue] = useState("");
  //initial player state is false
  const[isPlayOn, setIsPlayOn] = useState(false);
  const [correctWord, setCorrectWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [message, setMessage] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value.toUpperCase());
  }

  const selectWord =() => {
    const randomIndex =  Math.floor(Math.random() * WORDS.length);
    const tempWord = WORDS[randomIndex]; 
    return tempWord;
  }
  const handleButtonClick = () => {
    console.log('clicked');
    if(inputValue !== ''){
      if(correctWord=== inputValue){
        setMessage('Correct Answer')
      } else{
        setMessage('Wrong Answer')
      }
    }
  }

  // const constructScrambledWord = (word)=>{
  //   const shuffledArray = word.split("");
  //   for (let i = shuffledArray.length - 1; i > 0; i--){
  //     const j= Math.floor(Math.random()* (i+1));
  //     [shuffledArray[i],shuffledArray [j]] = [shuffledArray[j], shuffledArray[i]];
  //   }
  //   return shuffledArray.join('');
  // };

  const constructScrambledWordModernJS = (word) =>{
    const shuffledArray = word.split('').reduce((newArr, _, i)=>{
      const j = Math.floor(Math.random()*(i+1));
      [newArr[i], newArr[j]]= [newArr[j], newArr[i]];
      return newArr;
    }, [...words])
    return shuffledArray.join('');
  }
  const handleStartGame = () =>{
    setIsPlayOn(true);
    setInputValue("");
    const word = selectWord();
    setCorrectWord(word.toUpperCase());
    setScrambledWord(constructScrambledWord(word));
    console.log((constructScrambledWord(word)));
    setMessage("");
    //need to set the correct word, update state of the correct word
  };
  //&& if is packed is true render something otherwise render nothing 
  //if there is a condition do something 

  useEffect(()=>{
    let clearMessage;
      //code to run on component reader 
    if(message === 'Wrong Answer'){
      clearMessage = setTimeout(()=> setMessage(''), 800);
    }
 return () => {
    //code to run on component re-render or unmount
  if(clearMessage){
    clearTimeout(clearMessage);
  }
 }; 
 //array of dependencies 
},[message]);
  return (
    <div className='word_scramble'> 
    {/* message ===''=> false
    message !== ''=> true */}
      {!!message &&(
        <div className='message'>
        <p>{message}</p>
      </div>
      )}
      <h1>Word Scramble</h1>
      <div className='content'>
        
        {/* {condition ? valueIf_true : valueIf_false} */}
        {
          isPlayOn ? (
      <>
      <div className='board'>
  {/* el represents the character and i is the index of char. el_i is the unique key you need a unique key for each element */ }
        {correctWord.split("").map((el, i)=>(
          <span key={`${el}_${i}`} className='square_bg' >
          {inputValue[i]}
          </span>
        ))}
        </div>
        <p className ='scrambled_word'>{scrambledWord}</p>
        <div className='fields'>
          <input type='text'onChange ={handleInputChange} value={inputValue}/>
          <button type='button' onClick={handleButtonClick} >Enter</button>
        </div>
        </>
          ) :   (<button className = 'start_game' type='button' onClick={handleStartGame}>Start Game</button>
          )}
          {isPlayOn &&
          (
            <button className='start_game new' type = 'button' onClick={handleStartGame}>
            New Game 
            </button>
          )

          }
        </div>
        </div>
    )
};

export default WordScramble;
