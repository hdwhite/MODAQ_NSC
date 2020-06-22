import { observable, action } from "mobx";
import { ITossupProtestEvent, IBonusProtestEvent } from "./Events";
import { Team } from "./TeamState";
import { ignore } from "mobx-sync";

export class UIState {
    constructor() {
        this.cycleIndex = 0;
        this.isEditingCycleIndex = false;
        this.selectedWordIndex = -1;
        this.buzzMenuVisible = false;
        this.pendingBonusProtestEvent = undefined;
        this.pendingTossupProtestEvent = undefined;
    }

    // TODO: Should we also include the Cycle? This would simplify anything that needs access to the cycle
    @observable
    public cycleIndex: number;

    @observable
    @ignore
    public isEditingCycleIndex: boolean;

    @observable
    @ignore
    public selectedWordIndex: number;

    @observable
    @ignore
    public buzzMenuVisible: boolean;

    @observable
    @ignore
    public pendingBonusProtestEvent?: IBonusProtestEvent;

    @observable
    @ignore
    public pendingTossupProtestEvent?: ITossupProtestEvent;

    @action
    public nextCycle(): void {
        this.setCycleIndex(this.cycleIndex + 1);
    }

    @action
    public previousCycle(): void {
        if (this.cycleIndex > 0) {
            this.setCycleIndex(this.cycleIndex - 1);
        }
    }

    @action
    public setCycleIndex(newIndex: number): void {
        if (newIndex >= 0) {
            this.cycleIndex = newIndex;

            // Clear the selected words, since it's not relevant to the next question
            this.selectedWordIndex = -1;
        }
    }

    @action
    public setIsEditingCycleIndex(isEditingCycleIndex: boolean): void {
        this.isEditingCycleIndex = isEditingCycleIndex;
    }

    @action
    public setPendingBonusProtest(team: Team, questionIndex: number, part: number): void {
        this.pendingBonusProtestEvent = {
            part,
            questionIndex,
            reason: "",
            team,
        };
    }

    @action
    public setPendingTossupProtest(team: Team, questionIndex: number, position: number): void {
        this.pendingTossupProtestEvent = {
            position,
            questionIndex,
            reason: "",
            team,
        };
    }

    @action
    public setSelectedWordIndex(newIndex: number): void {
        this.selectedWordIndex = newIndex;
    }

    @action
    public hideBuzzMenu(): void {
        this.buzzMenuVisible = false;
    }

    @action
    public resetPendingBonusProtest(): void {
        this.pendingBonusProtestEvent = undefined;
    }

    @action
    public resetPendingTossupProtest(): void {
        this.pendingTossupProtestEvent = undefined;
    }

    @action
    public showBuzzMenu(): void {
        this.buzzMenuVisible = true;
    }
}
