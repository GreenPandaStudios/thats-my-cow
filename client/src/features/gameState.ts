// src/features/yourSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { assert } from "./assert";
import { killYourCows, marryMyCows, thatsMyCow } from "./reducers";

/**
 * The rules of the game
 *
 * - standard: The game is played with the standard rules
 * - enhanced: The game is played with the enhanced rules, including moonies, milking, and educating cows
 */
export type IGameRules = "standard" | "enhanced";

export interface IPlayer {
	/** Name of the player */
	name: string;

	/** Number of cows this player has */
	cows: number;

	/** Number of moonies this player has */
	moonies?: number;
}

export interface IGameState {
	/** Players of the game */
	players: {
		[key: string]: IPlayer;
	};

	/** If the game has started */
	started: boolean;

	/** Log of what has happened in the game */
	log: string[];

	/** Number of cows this player has educated */
	rules: IGameRules;
}

const initialState: IGameState = {
	players: {},
	log: [],
	started: false,
	rules: "standard",
};

const gameSlice = createSlice({
	name: "gameState",
	initialState,
	reducers: {
		addPlayer(state, action: { payload: { name: string } }) {
			assert(!state.started, "Cannot add players after the game has started");
			assert(!state.players[action.payload.name], "Player already exists");
			const { name } = action.payload;
			state.players[name] = { name, cows: 2 };
		},
		startGame(state) {
			assert(!state.started, "Cannot start a game that is already started");
			state.started = true;
		},
		endGame(state) {
			assert(state.started, "Cannot end a game that has not started");
			state.started = false;
		},
		resetGame(state) {
			state.players = {};
			state.log = [];
			state.started = false;
		},
		killCows: killYourCows,
		marryCows: marryMyCows,
		claimCow: thatsMyCow,
	},
});

export const {
	addPlayer,
	startGame,
	endGame,
	killCows,
	marryCows,
	claimCow,
	resetGame,
} = gameSlice.actions;

export const isGameRunning = (state: { gameState: IGameState }) =>
	state.gameState.started;

export const getPlayers = (state: { gameState: IGameState }) =>
	state.gameState.players;

export const getPlayer = (
	state: { gameState: IGameState },
	playerName: string
) => {
	const player = state.gameState.players[playerName];
	if (!player) {
		throw new Error(`Player with name "${playerName}" does not exist`);
	}
	return player;
};

export const getRules = (state: { gameState: IGameState }) =>
	state.gameState.rules;

export const getGameLog = (state: { gameState: IGameState }) =>
	state.gameState.log;

export default gameSlice.reducer;
