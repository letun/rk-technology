import React from "react";
import classnames from "classnames";

import { CardImage } from "../CardImage";
import { CardBody } from "../CardBody";

import styles from "./Card.module.scss";

export const Card: React.FC = () => {
    const [isChecked, setIsChecked] = React.useState<boolean>(true);
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
    const [countdown, setCountdown] = React.useState<number>(0);

    const handleCheckboxChange = (): void => {
        if (!isDisabled) {
            setIsChecked(!isChecked);
            setIsDisabled(true);
            setCountdown(5);

            const interval: number = setInterval(() => {
                setCountdown((prev: number) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsDisabled(false);
                        setIsChecked(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <div
                className={classnames(styles.card, {
                    [styles.card___shake]: !isChecked,
                })}
            >
                <label className={styles.card_label}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        disabled={isDisabled}
                    />
                    <span>
                        {isDisabled
                            ? `Checkbox disabled for ${countdown} seconds...`
                            : "Enabled"}
                    </span>
                </label>
                <CardBody />
                <CardImage />
            </div>
        </div>
    );
};
