import Card from "./Card";
import CardStack, { getDeck } from "./CardStack";

export default class Game {
    readonly board: CardStack[];
    readonly deck: CardStack;

    constructor(board?: CardStack[], deck?: CardStack) {
        this.board = board ?? [];
        this.deck = deck ?? getDeck(false);
    }

    dealCard(): Game {
        if(this.deck.cards.length === 0) {
            return new Game(this.board, this.deck);
        }
        const card = this.deck.cards.at(-1) as Card;
        const newStack = new CardStack([card], true);
        const newDeck = new CardStack(this.deck.cards.slice(0, -1), false);
        return new Game([...this.board, newStack], newDeck);
    }

    moveStack(targetIndex: number, destinationIndex: number): Game {
        if(targetIndex - destinationIndex !== 1 && targetIndex - destinationIndex !== 3) {
            return new Game(this.board, this.deck);
        }
        const targetStack = this.board[targetIndex];
        const destinationStack = this.board[destinationIndex];
        if(targetStack.matches(destinationStack)) {
            const newBoard = [
                ...this.board.slice(0, destinationIndex),
                targetStack.stackAbove(destinationStack),
                ...this.board.slice(destinationIndex+1, targetIndex),
                ...this.board.slice(targetIndex+1)
            ];
            return new Game(newBoard, this.deck);
        } else {
            return new Game(this.board, this.deck);
        }
    }

    hasValidMoves(): boolean {
        if(this.deck.cards.length > 0) {
            // Deck still has cards
            return true;
        }
        return this.board.some((stack: CardStack, index: number) => (
            index+1 < this.board.length && stack.matches(this.board[index+1])
        ) || (
            index+3 < this.board.length && stack.matches(this.board[index+3])
        ));
    }
}