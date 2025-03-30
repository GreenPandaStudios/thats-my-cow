import React, { useCallback } from 'react';
import { ScoreBoard } from './ScoreBoard';
import { Log } from "./Log"
import { useDispatch } from 'react-redux';
import { resetGame, endGame } from '../../features';

export const ActiveGame: React.FC = () => {
    const dispatch = useDispatch();

    const endGameCb = useCallback(() => {
        dispatch(endGame())
        dispatch(resetGame());
    }, []);

    return (
        <div className="ActiveGame">
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
