import { assert } from "../assert";
import { IGameState } from "../gameState";

export function thatsMyCow(
	state: IGameState,
	action: {
		payload: { cowFor: string };
	}
) {
	assert(state.started, "Cannot get cows before the game has started");
	assert(
		state.players[action.payload.cowFor],
		"Player to claim cow does not exist"
	);
	const { cowFor } = action.payload;
	const before: number = state.players[cowFor].cows;
	const after: number = Math.round(before + 1);

	state.players[cowFor].cows = after;

	// Create a log of what happened
	var log: string = `<span class="name">${cowFor}</span> <span class="actionClaimed">claimed</span> a Cow, going from <span class="number">${before}</span> to <span class="number">${after}</span> cows.`;

	state.log.push(log);
}
