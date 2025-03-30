import React from 'react';
import { getGameLog } from '../../features';
import { useSelector } from 'react-redux';

export const Log: React.FC = () => {

    const log = useSelector(getGameLog);

    return (
        <div className="Log">
            {log.map((entry, index) => <p key={index}>{entry}</p>)}
        </div>
    );
};
