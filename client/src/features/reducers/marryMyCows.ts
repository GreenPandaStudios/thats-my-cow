import { assert } from "../assert";
import { IGameState } from "../gameState";

export function marryMyCows(
	state: IGameState,
	action: {
		payload: { marryCowsFor: string };
	}
) {
	assert(state.started, "Cannot marry cows before the game has started");
	assert(
		state.players[action.payload.marryCowsFor],
		"Player to marry cows for does not exist"
	);
	const { marryCowsFor } = action.payload;
	const before: number = state.players[marryCowsFor].cows;
	const after: number = Math.round(before * 2);

	state.players[marryCowsFor].cows = after;

	// Create a log of what happened
	var log: string = `${marryCowsFor}'s Cows were married, going from ${before} to ${after} cows.`;

	state.log.push(log);
}
