export type Suit = "heart" | "diamond" | "spade" | "club";

export default interface Card {
    suit: Suit;
    number: number;
}