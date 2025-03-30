import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers, IPlayer, killCows, marryCows, claimCow } from '../../features';



export const ScoreBoard: React.FC = () => {

    const players = useSelector(getPlayers)

    return (
        <div className="ScoreBoard">
            <ol>
                {Object.values(players)
                    .sort((a, b) => b.cows - a.cows)
                    .map((player, i) => (
                        <li key={i + player.name}>
                            <PlayerDisplay {...player} />
                        </li>
                    ))}
            </ol>
        </div>
    );
};


const PlayerDisplay: React.FC<IPlayer> = (player: IPlayer) => {
    const dispatch = useDispatch();
    const myCowCb = useCallback(() => {
        dispatch(claimCow({ cowFor: player.name }))
    }, []);

    const marryCb = useCallback(() => {
        dispatch(marryCows({ marryCowsFor: player.name }))
    }, []);

    const killCb = useCallback(() => {
        dispatch(killCows({ killCowsFor: player.name }))
    }, []);


    return (
        <div className="PlayerDisplay">
            <div className="textContainer">
                <h2>
                    {player.name}
                </h2>
                <p>
                    Cows: {player.cows}
                </p>
            </div>
            <div className="buttonContainer">
                <button onClick={killCb} className="killButton">
                    Kill {player.name}'s Cows
                </button>
                <button onClick={marryCb} className="marryButton">
                    Marry {player.name}'s Cows
                </button>
                <button onClick={myCowCb} className="myCowButton">
                    That's {player.name}'s Cow!!
                </button>
            </div>
        </div>
    )
}
