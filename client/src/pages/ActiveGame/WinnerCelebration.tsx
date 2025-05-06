import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlayers } from '../../features';

interface WinnerCelebrationProps {
    winners: string[];
    onClose: () => void;
}

export const WinnerCelebration: React.FC<WinnerCelebrationProps> = ({ winners, onClose }) => {
    const players = useSelector(getPlayers);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        // Start animations after component mounts
        setAnimationStarted(true);

        // Play sound effect if available
        const audio = new Audio('/assets/celebration.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    // Get cow count for the winner(s)
    const cowCount = winners.length > 0 ? players[winners[0]].cows : 0;

    // Generate random positions for the confetti
    const generateConfetti = () => {
        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#845ef7', '#ff922b', '#51cf66', '#339af0'];

        for (let i = 0; i < 100; i++) {
            const left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 0.5 + 0.5;
            const delay = Math.random() * 3;

            confetti.push(
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${left}%`,
                        backgroundColor: color,
                        transform: `scale(${size})`,
                        animationDelay: `${delay}s`
                    }}
                />
            );
        }

        return confetti;
    };

    // Generate animated cows
    const generateCows = () => {
        const cows = [];

        for (let i = 0; i < 12; i++) {
            const position = Math.random() * 90 + 5;
            const delay = Math.random() * 2;
            const size = Math.random() * 0.5 + 0.5;

            cows.push(
                <div
                    key={i}
                    className="animated-cow"
                    style={{
                        left: `${position}%`,
                        animationDelay: `${delay}s`,
                        transform: `scale(${size})`
                    }}
                >
                    🐮
                </div>
            );
        }

        return cows;
    };

    return (
        <div className={`winner-celebration ${animationStarted ? 'active' : ''}`}>
            <div className="celebration-overlay" />

            {/* Confetti */}
            {generateConfetti()}

            {/* Animated cows */}
            {generateCows()}

            {/* Trophy */}
            <div className="trophy">🏆</div>

            {/* Winner message */}
            <div className="winner-message">
                <h1 className="congratulations">Congratulations!</h1>

                {winners.length === 1 ? (
                    <>
                        <h2 className="winner-name">{winners[0]}</h2>
                        <p className="winner-details">You won with {cowCount} cows!</p>
                        <p className="winner-subtitle">🐄 The Greatest Cow Collector 🐄</p>
                    </>
                ) : (
                    <>
                        <h2 className="winner-name">It's a tie!</h2>
                        <div className="tied-winners">
                            {winners.map(winner => (
                                <p key={winner} className="tied-winner">{winner}</p>
                            ))}
                        </div>
                        <p className="winner-details">All with {cowCount} cows!</p>
                        <p className="winner-subtitle">🐄 Amazing Cow Collectors 🐄</p>
                    </>
                )}

                <button onClick={onClose} className="continue-button">
                    Continue to New Game
                </button>
            </div>

            {/* Rotating stars */}
            <div className="stars-container">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            transform: `rotate(${i * 45}deg)`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    >
                        ⭐
                    </div>
                ))}
            </div>
        </div>
    );
};