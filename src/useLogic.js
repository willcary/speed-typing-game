import {useState, useEffect, useRef} from "react";

function useLogic() {
    const STARTING_TIME = 10;
    
    const [text, setText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);
    const textBoxRef = useRef(null);
    
    function handleChange(e) {
        const {value} = e.target;
        setText(value);
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ");
        return wordsArr.filter(word => word !== "").length;
    }

    function calculateWpm(words) {
        return words / STARTING_TIME * 60
    }
    
    function startGame() {
        setIsTimeRunning(true);
        setTimeRemaining(STARTING_TIME);
        setText("");
        textBoxRef.current.disabled = false;
        textBoxRef.current.focus();
    }
    
    function endGame() {
        setIsTimeRunning(false);
        setWordCount(calculateWordCount(text));
        setWpm(calculateWpm(wordCount));
    }
    
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1);
            }, 1000);
        } 
        if(timeRemaining === 0) {
            endGame();
        }
    }, [timeRemaining, isTimeRunning]);
    
    return [textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount, wpm];
}

export default useLogic;