import { Game } from './game';

export class User {
    userId: Number;
    games: Game[];

    constructor(userId: Number, games: Array<Game>) {
        this.userId = userId;
        this.games = games;
    }
}
