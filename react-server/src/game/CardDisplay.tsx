import Card from "../model/Card";

interface PropsType {
    card?: Card;
    faceup: boolean;
    className?: string;
    onClick?: () => void;
}

export default function CardDisplay({card, faceup, className, onClick}: PropsType) {
    const number = card ? getCardNumber(card?.number) : "";
    const suit = card?.suit.charAt(0).toUpperCase();
    return <img
        src={faceup ? `cards/${number}${suit}.svg` : "cards/2B.svg"}
        className={className}
        onClick={onClick}
    />;
}

function getCardNumber(number: number): string {
    switch(number) {
        case 1:
            return "A";
        case 10:
            return "T";
        case 11:
            return "J";
        case 12:
            return "Q";
        case 13:
            return "K";
        default:
            return String(number);
    }
}