import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

const Toggle = ({ on = false, onClick }) => {
    const [isOn, setIsOn] = useState(on);

    const handleClick = () => {
        setIsOn((prev) => !prev);
        onClick?.();
    };

    useEffect(() => {
        setIsOn(on);
    }, [on]);

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={clsx(styles.toggle, isOn && styles.checked)} />
        </div>
    );
};

export default Toggle;
