import { Game } from './game';

export class User {
    userId: number;
    games: Game[];

    constructor(userId: number, games: Array<Game>) {
        this.userId = userId;
        this.games = games;
    }
}
