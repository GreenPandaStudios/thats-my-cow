import React from 'react';
import { useSelector } from 'react-redux';
import { NewGame, ActiveGame } from '..';
import { isGameRunning } from '../../features';
import DonateButton from './DonateButton';

export const Home: React.FC = () => {

    const isRunning = useSelector(isGameRunning);

    return (
        <div className="Home">
            <DonateButton />
            <div>
                {isRunning ? <ActiveGame /> : <NewGame />}
            </div>
        </div>
    );
};
