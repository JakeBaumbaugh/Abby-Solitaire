import { useState } from "react"
import Card, { getCardText } from "../model/Card";
import CardStack from "../model/CardStack";
import { newGame } from "../model/Game";
import "./game-view.css";

export default function GameView() {
    const [game, setGame] = useState(newGame());

    const handleDeckClick = () => setGame(game => {
        if(game.deck.cards.length === 0) {
            return game;
        }
        const card = game.deck.cards.at(-1) as Card;
        const newStack: CardStack = {
            cards: [card],
            faceup: true
        };
        const newDeck: CardStack = {
            cards: game.deck.cards.slice(0, -1),
            faceup: false
        }
        return {board: [...game.board, newStack], deck: newDeck};
    });

    return <>
        <div className="game-board">
            {game.board.map((stack, i) => (
                <div className="card" key={i}>{getCardText(stack.cards.at(-1) as Card)}</div>
            ))}
        </div>
        <div>
            <div className="deck" onClick={() => handleDeckClick()}>DECK</div>
        </div>
    </>
}