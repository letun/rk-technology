import React from "react";
import styles from "./CardImage.module.scss";
import { Skeleton } from "./Skeleton";
import { observer } from "mobx-react-lite";
import imageStore from "../../store/image";
import { ImageData } from "../../store/image";

export const CardImage: React.FC = observer(() => {
    if (imageStore.isLoading) {
        return (
            <div className={styles.cardImageWrapper}>
                <Skeleton />
            </div>
        );
    }

    if (imageStore.error) {
        return (
            <div className={styles.cardImageWrapper}>
                Error: {imageStore.error}
            </div>
        );
    }

    const image = imageStore.image as ImageData | undefined;

    return (
        <div className={styles.cardImageWrapper}>
            {image?.url && (
                <img
                    className={styles.cardImage}
                    src={image.url}
                    width={image.width}
                    height={image.height}
                />
            )}
        </div>
    );
});
