import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers, addPlayer, removePlayer, startGame } from '../../features';

export const PlayerList: React.FC = () => {
    const players = useSelector(getPlayers)
    const dispatch = useDispatch();


    const startGameCb = useCallback(() => {
        dispatch(startGame());
        // Add logic to start the game here
    }, []);

    const onAddPlayer = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.querySelector('input');
        if (input && input.value.trim()) {
            // Dispatch an action or handle adding the player here
            dispatch(addPlayer({ name: input.value }));
            input.value = ''; // Clear the input field
        }
    }, []);

    const onRemovePlayer = useCallback((name: string) => {
        // Dispatch an action or handle removing the player here
        dispatch(removePlayer({ name }));
    }, []);

    return (
        <div className="PlayerList">
            <ul>
                {Object.values(players)
                    .map((player, i) => (
                        <li key={i}>
                            <h2>
                                {player.name}
                            </h2>
                            <button className='removePlayerButton' onClick={() => onRemovePlayer(player.name)}>
                                Remove Player
                            </button>
                        </li>
                    ))}
                <form onSubmit={onAddPlayer}>
                    <input type="text" placeholder="Enter player's name" />
                    <button type="submit">Add New Player</button>
                </form>
            </ul>
            <button onClick={startGameCb}>
                Start Game
            </button>
        </div>
    );
};