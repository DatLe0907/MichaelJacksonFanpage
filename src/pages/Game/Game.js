import GuessWord from "./GuessWord/GuessWord"
// import { GameProvider } from "../context/PointsContext";
import "./Game.css"
function Game(){
    return (<div className="Game">
        <GuessWord/>
    </div>)
}

export default Game