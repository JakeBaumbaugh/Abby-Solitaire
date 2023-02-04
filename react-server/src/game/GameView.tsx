import { useState } from "react"
import Card from "../model/Card";
import Game from "../model/Game";
import "./game-view.css";
import CardDisplay from "./CardDisplay";

export default function GameView() {
    const [game, setGame] = useState(new Game());
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleDeckClick = () => {
        setSelectedIndex(-1);
        setGame(game => game.dealCard());
    };

    const handleCardClick = (index: number) => {
        // This switch could be entirely handled by the logic in setGame, but prevents re-render
        switch(selectedIndex - index) {
            case 0:
                // Deselect stack
                setSelectedIndex(-1);
                break;
            case 1: case 3:
                // Move selected stack to current stack
                setGame(game => {
                    const newGame = game.moveStack(selectedIndex, index);
                    if(newGame.board.length === game.board.length) {
                        // Board length did not change, invalid move. Select new pile.
                        setSelectedIndex(index);
                    } else {
                        // Move succeeded. Deselect.
                        setSelectedIndex(-1);
                    }
                    return newGame;
                });
                break;
            default:
                // Select stack
                setSelectedIndex(index);
        }
    }

    const getCssClass = (index: number) => {
        switch(selectedIndex - index) {
            case 0:
                return "card selected";
            case 1: case 3:
                return "card destination";
            default:
                return "card";
        }
    }

    return <>
        <div className="game-board">
            {game.board.map((stack, i) => (
                <CardDisplay
                    card={stack.cards.at(-1) as Card}
                    faceup={true}
                    className={getCssClass(i)}
                    onClick={() => handleCardClick(i)}
                    key={i}
                />
            ))}
        </div>
        <div>
            <CardDisplay
                faceup={false}
                className={game.deck.cards.length === 0 ? "deck empty card" : "deck card"}
                onClick={() => handleDeckClick()}
            />
        </div>
    </>
}