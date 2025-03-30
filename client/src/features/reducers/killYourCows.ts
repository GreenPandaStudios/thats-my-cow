import { assert } from "../assert";
import { IGameState } from "../gameState";

export function killYourCows(
	state: IGameState,
	action: {
		payload: { killCowsFor: string; playerKillingTheCows?: string };
	}
) {
	assert(state.started, "Cannot kill cows before the game has started");
	assert(
		state.players[action.payload.killCowsFor],
		"Player to kill cows for does not exist"
	);
	assert(
		!action.payload.playerKillingTheCows ||
			state.players[action.payload.playerKillingTheCows],
		"Player killing the cows does not exist"
	);
	const { killCowsFor, playerKillingTheCows } = action.payload;

	const before: number = state.players[killCowsFor].cows;
	const after: number = Math.round(before / 2);

	state.players[killCowsFor].cows = after;

	// Create a log of what happened
	var log: string = `${killCowsFor}'s Cows were killed`;

	if (playerKillingTheCows !== undefined) {
		log += ` by ${playerKillingTheCows}`;
	}

	log += `, going from ${before} to ${after} cows.`;

	state.log.push(log);
}
