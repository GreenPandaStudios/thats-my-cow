import React from 'react';
import { useSelector } from 'react-redux';
import { NewGame, ActiveGame } from '..';
import { isGameRunning } from '../../features';

export const Home: React.FC = () => {

    const isRunning = useSelector(isGameRunning);

    return (
        <div className="Home">
            <div>
                {isRunning ? <ActiveGame /> : <NewGame />}
            </div>
        </div>
    );
};
