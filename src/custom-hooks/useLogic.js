import { useState, useEffect, useRef } from "react";
import { storageAvailable } from '../utils/storageAvailable';

function useLogic() {
    const [time, setTime] = useState(15);
    const [text, setText] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(time);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [highScore, setHighScore] = useState(0);

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
        return words / time * 60
    }
    
    function startGame() {
        setIsTimeRunning(true);
        setTimeRemaining(time);
        setText("");
        textBoxRef.current.disabled = false;
        textBoxRef.current.focus();
    }
    
    function endGame() {
        setIsTimeRunning(false);
        setWordCount(calculateWordCount(text));
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
    
    useEffect(() => {
        setWpm(calculateWpm(wordCount));
    }, [wordCount]);

    useEffect(() => {
        if (wpm > highScore) {
            setHighScore(wpm);
        }
    }, [wpm])

    useEffect(() => {
        if (storageAvailable('localStorage')) {
            const storedHighScore = localStorage.getItem('highScore');
            setHighScore(storedHighScore);
        }
    }, []);

    useEffect(() => {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('highScore', highScore);
        }
    }, [highScore]);
    
    return [time, setTime, textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount, wpm, highScore];
}

export default useLogic;