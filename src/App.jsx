import React, { useState } from "react";
import BottomToolbar from "./components/BottomToolbar.jsx";
import Canvas from "./components/Canvas.jsx";
import SettingsToolbar from "./components/SettingsToolbar.jsx";

function App() {
    const [isPanMode, setPanMode] = useState(false);
    const [canvasSize, setCanvasSize] = useState({
        value: "A4", width: 210 * 3, height: 297 * 3
    });

    const [shape, setShape] = React.useState(null);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                background: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* Zoomable & Pannable Canvas */}
            <Canvas isPanMode={isPanMode} setPanMode={setPanMode} canvasSize={canvasSize} selectedShape={shape}/>

            {/* Fixed Bottom Toolbar */}
            <BottomToolbar setPanMode={setPanMode} shape={shape} setShape={setShape} />

            {/* Full-Size Right Settings Toolbar */}
            <SettingsToolbar canvasSize={canvasSize} setCanvasSize={setCanvasSize} />
        </div>
    );
}

export default App;
