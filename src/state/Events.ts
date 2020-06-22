import { ITeam, IPlayer } from "./TeamState";
import { IBuzzMarker } from "./IBuzzMarker";

export interface ITossupAnswerEvent {
    tossupIndex: number;
    marker: IBuzzMarker;
}

export interface IBonusAnswerEvent {
    bonusIndex: number;
    correctParts: ICorrectBonusAnswerPart[];
    receivingTeam: ITeam;
}

export interface ICorrectBonusAnswerPart {
    index: number;
    points: number;
}

export interface ITossupProtestEvent extends IProtestEvent {
    position: number;
}

export interface IBonusProtestEvent extends IProtestEvent {
    part: number;
}

export interface ISubstitutionEvent {
    inPlayer: IPlayer;
    outPlayer: IPlayer;
}

export interface IThrowOutQuestionEvent {
    questionIndex: number;
}

// TODO: Consider adding a "note" or "free" event, that can tell the TD something special about this cycle

interface IProtestEvent {
    questionIndex: number;
    reason: string;
    team: ITeam;
}
