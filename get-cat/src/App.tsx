import React from "react";
import { Card } from "./components/Card";

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <div className="container">
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default App;
