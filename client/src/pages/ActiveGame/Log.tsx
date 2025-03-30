import React from 'react';
import { getGameLog } from '../../features';
import { useSelector } from 'react-redux';

export const Log: React.FC = () => {

    const log = useSelector(getGameLog);

    return (
        <div className="Log">
            {log.slice().reverse().map((entry, index) => (
                <p key={log.length - index} dangerouslySetInnerHTML={{ __html: entry }} />
            ))}
        </div>
    );
};
