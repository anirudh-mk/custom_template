// import React from "react";
// import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
//
// function SettingsToolbar({ setCanvasSize }) {
//     return (
//         <Paper
//             sx={{
//                 position: "absolute",
//                 right: 20,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 bgcolor: "white",
//                 p: 2,
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 1,
//             }}
//         >
//             <h3 style={{ margin: 0, fontSize: "1rem", textAlign: "center" }}>Canvas Size</h3>
//             <ToggleButtonGroup
//                 orientation="vertical"
//                 exclusive
//                 onChange={(e, newSize) => newSize && setCanvasSize(newSize)}
//                 aria-label="canvas size"
//             >
//                 <ToggleButton value="A4">A4 (210x297mm)</ToggleButton>
//                 <ToggleButton value="A3">A3 (297x420mm)</ToggleButton>
//                 <ToggleButton value="A5">A5 (148x210mm)</ToggleButton>
//                 <ToggleButton value="Letter">Letter (8.5x11in)</ToggleButton>
//                 <ToggleButton value="Custom">Custom</ToggleButton>
//             </ToggleButtonGroup>
//         </Paper>
//     );
// }
//
// export default SettingsToolbar;
import React, { useState } from "react";
import { Paper, TextField, Autocomplete } from "@mui/material";

const canvasSizes = [
    { label: "A4 (210x297mm)", value: "A4", width: 210 * 3, height: 297 * 3 },
    { label: "A3 (297x420mm)", value: "A3", width: 297 * 3, height: 420 * 3 },
    { label: "A5 (148x210mm)", value: "A5", width: 148 * 3, height: 210 * 3 },
    { label: "Letter (8.5x11in)", value: "Letter", width: 816, height: 1056 },
    { label: "Custom", value: "Custom", width: 800, height: 600 }, // Default custom
];

function SettingsToolbar({ canvasSize, setCanvasSize }) {
    const [customSize, setCustomSize] = useState({ width: 800, height: 600 });

    const handleSizeChange = (event, newValue) => {
        if (!newValue) return;
        if (newValue.value === "Custom") {
            setCanvasSize({ ...newValue, width: customSize.width, height: customSize.height });
        } else {
            setCanvasSize(newValue);
        }
    };

    const handleCustomSizeChange = (event) => {
        const { name, value } = event.target;
        const newSize = { ...customSize, [name]: value ? parseInt(value) : 0 };
        setCustomSize(newSize);
        setCanvasSize({ value: "Custom", ...newSize });
    };

    return (
        <Paper
            sx={{
                position: "absolute",
                right: 0,
                top: 0,
                height: "100vh",
                width: "250px",
                bgcolor: "white",
                p: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <h3 style={{ margin: 0, fontSize: "1.2rem", textAlign: "center" }}>Canvas Settings</h3>

            {/* AutoComplete Dropdown */}
            <Autocomplete
                size="small"
                options={canvasSizes}
                getOptionLabel={(option) => option.label}
                value={canvasSizes.find(size => size.value === canvasSize.value) || canvasSizes[0]}
                onChange={handleSizeChange}
                renderInput={(params) => <TextField {...params} label="Canvas Size" />}
            />

            {/* Custom Width & Height Inputs */}
            {canvasSize.value === "Custom" && (
                <>
                    <TextField
                        size="small"
                        label="Width (px)"
                        name="width"
                        type="number"
                        value={customSize.width}
                        onChange={handleCustomSizeChange}
                    />
                    <TextField
                        size="small"
                        label="Height (px)"
                        name="height"
                        type="number"
                        value={customSize.height}
                        onChange={handleCustomSizeChange}
                    />
                </>
            )}
        </Paper>
    );
}

export default SettingsToolbar;
