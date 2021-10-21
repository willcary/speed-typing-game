import React from "react";
import useLogic from "./useLogic";

function App() {
    const [textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount, wpm] = useLogic();
    
    return (
        <main>
            <h1>Speed Typing Game</h1>
            <h2>How fast can you type?</h2>
            <p>(Click START to begin)</p>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h3>Time remaining: {timeRemaining}</h3>
            <button 
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <h2>Word count: {wordCount}</h2>
            <h2>Words per Minute: {wpm}</h2>
        </main>
    );
}

export default App;