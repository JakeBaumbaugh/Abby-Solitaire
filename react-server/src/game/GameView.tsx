import { useState } from "react"
import Card, { getCardText } from "../model/Card";
import CardStack, { combineStacks } from "../model/CardStack";
import { newGame } from "../model/Game";
import "./game-view.css";
import { validCardMatch } from '../model/Card';
import { getTopCard } from '../model/CardStack';

export default function GameView() {
    const [game, setGame] = useState(newGame());
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleDeckClick = () => setGame(game => {
        setSelectedIndex(-1);
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

    const handleCardClick = (index: number) => {
        switch(selectedIndex - index) {
            case 0:
                // Deselect stack
                setSelectedIndex(-1);
                break;
            case 1: case 3:
                // Move selected stack to current stack
                setGame(game => {
                    const selectedStack = game.board[selectedIndex];
                    const destinationStack = game.board[index];
                    if(validCardMatch(getTopCard(selectedStack) as Card, getTopCard(destinationStack) as Card)) {
                        const newBoard = [
                            ...game.board.slice(0, index),
                            combineStacks(destinationStack, selectedStack),
                            ...game.board.slice(index+1, selectedIndex),
                            ...game.board.slice(selectedIndex+1)
                        ];
                        setSelectedIndex(-1);
                        return {board: newBoard, deck: game.deck};
                    } else {
                        setSelectedIndex(index);
                        return game;
                    }
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
                <div className={getCssClass(i)} onClick={() => handleCardClick(i)} key={i}>
                    {getCardText(stack.cards.at(-1) as Card)}
                </div>
            ))}
        </div>
        <div>
            <div className={game.deck.cards.length === 0 ? "deck empty card" : "deck card"} onClick={() => handleDeckClick()}/>
        </div>
    </>
}