import React, { useCallback, useState } from 'react';
import { ScoreBoard } from './ScoreBoard';
import { Log } from "./Log"
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, endGame, getPlayers } from '../../features';
import { WinnerCelebration } from './WinnerCelebration';

export const ActiveGame: React.FC = () => {
    const dispatch = useDispatch();
    const players = useSelector(getPlayers);
    const [showWinners, setShowWinners] = useState(false);
    const [winners, setWinners] = useState<string[]>([]);

    const determineWinners = useCallback(() => {
        // Find player(s) with the most cows
        const playerEntries = Object.values(players);
        if (playerEntries.length === 0) return [];

        const maxCows = Math.max(...playerEntries.map(player => player.cows));
        return playerEntries
            .filter(player => player.cows === maxCows)
            .map(player => player.name);
    }, [players]);

    const endGameCb = useCallback(() => {
        const gameWinners = determineWinners();
        setWinners(gameWinners);
        setShowWinners(true);
    }, [determineWinners]);

    const handleCelebrationClose = useCallback(() => {
        dispatch(endGame());
        dispatch(resetGame());
        setShowWinners(false);
    }, [dispatch]);

    return (
        <div className="ActiveGame">
            {showWinners && <WinnerCelebration winners={winners} onClose={handleCelebrationClose} />}
            <div className="contentContainer">
                <div className='scoreBoardCotnainer'>
                    <ScoreBoard />
                </div>
                <div className="logContainer">
                    <Log />
                </div>
            </div>
            <button onClick={endGameCb} className="endGameButton">
                End Game
            </button>
        </div>
    );
};
