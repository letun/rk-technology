import React from "react";

import imageStore from "../../store/image";

import styles from "./CardBody.module.scss";

export const CardBody = () => {
    const [autoRefresh, setAutoRefresh] = React.useState<boolean>(false);

    React.useEffect(() => {
        imageStore.fetchImage();
        let intervalId: number | undefined;

        if (autoRefresh) {
            intervalId = setInterval(() => {
                imageStore.fetchImage();
            }, 5000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [autoRefresh]);

    return (
        <div className={styles.CardBody}>
            <label className={styles.cardBody_label}>
                <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAutoRefresh(e.target.checked)
                    }
                />
                <span>Auto-refresh every 5s</span>
            </label>
            <button
                className={styles.cardBody_button}
                onClick={() => imageStore.fetchImage()}
            >
                Get a cat
            </button>
        </div>
    );
};
