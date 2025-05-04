import React, { useState } from 'react';

const DonateButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDonateClick = () => {
        setIsVisible(false);
    };

    return (
        <a aria-description='Donate' className={isVisible ? "donate-button" : "donate-button invisible"} onClick={handleDonateClick} href='https://donate.stripe.com/14kdR05yJgqU1ji5kk'>
            <img src="/Moony.png" alt="Donate Moony" />
        </a>
    );
};

export default DonateButton;