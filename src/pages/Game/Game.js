import { useState } from "react";
import GuessWord from "./GuessWord/GuessWord";
import "./Game.css";

function Game() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="Game">
            {!isPlaying && (
                <div className="game-description">
                    <h2>Welcome to Guess the Word!</h2>
                    <p>
                        Try to guess the hidden word by selecting letters. Each correct guess brings you closer to revealing the full word.<br/> <br/>
                        All of the questions pertain to Michael Jackson, including his awards, music career, achievements, and family.
                    </p>
                    <p>
                        Earn <strong>tokens</strong> for every correct guess! Tokens can be used in the shop to unlock exciting rewards.
                    </p>
                    <p>Are you ready? Click "Play" to begin!</p>
                </div>
            )}
            <GuessWord onStartGame={() => setIsPlaying(true)} onExitGame={() => setIsPlaying(false)} />
        </div>
    );
}

export default Game;
