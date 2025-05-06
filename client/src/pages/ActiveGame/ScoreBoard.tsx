import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers, IPlayer, killCows, marryCows, claimCow } from '../../features';

export const ScoreBoard: React.FC = () => {

    const players = useSelector(getPlayers)

    return (
        <div className="ScoreBoard">
            {Object.values(players)
                .map((player, i) => (
                    <PlayerDisplay {...player} key={i} />
                ))}
        </div>
    );
};


const PlayerDisplay: React.FC<IPlayer> = (player: IPlayer) => {
    const dispatch = useDispatch();
    const myCowCb = useCallback(() => {
        dispatch(claimCow({ cowFor: player.name }));
        animateButton('myCowButton');
    }, [dispatch, player.name]);

    const marryCb = useCallback(() => {
        dispatch(marryCows({ marryCowsFor: player.name }));
        animateButton('marryButton');
    }, [dispatch, player.name]);

    const killCb = useCallback(() => {
        dispatch(killCows({ killCowsFor: player.name }));
        animateButton('killButton');
    }, [dispatch, player.name]);

    const myCowButtonRef = React.useRef<HTMLButtonElement>(null);
    const marryButtonRef = React.useRef<HTMLButtonElement>(null);
    const killButtonRef = React.useRef<HTMLButtonElement>(null);
    const scoreRef = React.useRef<HTMLSpanElement>(null);
    const animateButton = (buttonType: 'myCowButton' | 'marryButton' | 'killButton') => {
        const buttonRefMap = {
            myCowButton: myCowButtonRef,
            marryButton: marryButtonRef,
            killButton: killButtonRef
        };

        const buttonElement = buttonRefMap[buttonType].current;
        if (buttonElement) {
            buttonElement.classList.add('animate');
            setTimeout(() => {
                buttonElement.classList.remove('animate');
            }, 2000); // Animation duration in milliseconds
        }

        if (scoreRef.current) {
            scoreRef.current.classList.add('scoreChanged');
            setTimeout(() => {
                scoreRef.current?.classList.remove('scoreChanged');
            }, 2000); // Animation duration in milliseconds
        }
    };


    return (
        <div className="PlayerDisplay" key={player.name}>
            <div className="textContainer">
                <h2 className="playerName">
                    {player.name}
                </h2>
                <span className="score" ref={scoreRef}>
                    {player.cows}
                </span>
            </div>
            <div className="buttonContainer">
                <button
                    ref={myCowButtonRef}
                    onClick={myCowCb}
                    className="myCowButton"
                    aria-label={`That's ${player.name}'s Cow`}
                    title={`That's ${player.name}'s Cow`}
                >
                    🐮
                </button>
                <button
                    ref={marryButtonRef}
                    onClick={marryCb}
                    className="marryButton"
                    aria-label={`Marry ${player.name}'s Cows`}
                    title={`Marry ${player.name}'s Cows`}
                >
                    ⛪
                </button>
                <button
                    ref={killButtonRef}
                    onClick={killCb}
                    className="killButton"
                    aria-label={`Kill ${player.name}'s Cows`}
                    title={`Kill ${player.name}'s Cows`}
                >
                    🪦
                </button>
            </div>
        </div>
    )
}
