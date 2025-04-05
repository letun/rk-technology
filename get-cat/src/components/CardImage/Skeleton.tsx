import ContentLoader from "react-content-loader";

export const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={252}
        height={300}
        viewBox="0 0 252 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="0" ry="0" width="252" height="300" />
    </ContentLoader>
);
