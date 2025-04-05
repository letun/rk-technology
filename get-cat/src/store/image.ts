import { makeAutoObservable, runInAction } from "mobx";

export interface ImageData {
    id: string;
    url: string;
    width: number;
    height: number;
}

class ImageStore {
    image: ImageData | null = null;
    isLoading = false;
    isDisabled = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchImage(): Promise<void> {
        const headers: HeadersInit = {
            "content-type": "application/json",
            "x-api-key": import.meta.env.VITE_CAT_API_KEY as string,
        };

        this.isLoading = true;
        this.error = null;

        try {
            const response = await fetch(
                "https://api.thecatapi.com/v1/images/search?limit=1&order=RANDOM",
                {
                    headers,
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json: ImageData[] = await response.json();

            if (!json.length) {
                throw new Error("No images found in response");
            }

            runInAction(() => {
                this.image = json[0];
                this.isLoading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = `Failed to fetch cat image (${err})`;
                this.isLoading = false;
            });
        }
    }
}

export default new ImageStore();
