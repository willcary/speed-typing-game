import React from "react";
import useLogic from "./custom-hooks/useLogic";

function App() {
    const [time, handleTime, textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount, wpm, highScore, setHighScore] = useLogic();
    
    return (
        <main>
            <h1>Speed Typing Game</h1>
            <h2>How fast can you type?</h2>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
                spellCheck='true'
            />
            <h3>Time remaining: {timeRemaining}</h3>
            <button 
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <h3>Word count: {wordCount}</h3>
            <h3>Words per Minute: {wpm}</h3>

            <label htmlFor="">
              Set time (seconds): <input type="number" placeholder={time} value={time} onChange={(e) => handleTime(e)} />
            </label>
            <h2 className="high-score">High Score: {highScore}</h2>
            <button 
                onClick={() => setHighScore(0)}
                disabled={isTimeRunning}
                className="reset"
            >
                Reset High Score
            </button>
        </main>
    );
}

export default App;