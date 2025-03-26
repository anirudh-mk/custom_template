import React from "react";
import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import TitleIcon from "@mui/icons-material/Title";
import ImageIcon from "@mui/icons-material/Image";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Crop32Icon from '@mui/icons-material/Crop32';
import NearMeIcon from '@mui/icons-material/NearMe';

function BottomToolbar({ setPanMode }) {
    const [shape, setShape] = React.useState(null);

    const handleShapeChange = (event, newShape) => {
        if (newShape) {
            setShape(newShape);

            if (newShape === "Pan") {
                setPanMode(true);
            } else {
                setPanMode(false);
            }
        }
    };

    return (
        <Paper sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "white",
            p: 1,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            gap: 1,
        }}>
            <ToggleButtonGroup
                value={shape}
                exclusive
                onChange={handleShapeChange}
                aria-label="shape tools"
            >
                {/* Pan Mode Button */}
                <ToggleButton
                    value="Pan"
                    aria-label="Pan Mode"
                >
                    <NearMeIcon />
                </ToggleButton>

                <ToggleButton
                    value="Circle"
                    aria-label="Circle"
                >
                    <PanoramaFishEyeIcon />
                </ToggleButton>
                <ToggleButton
                    value="Square"
                    aria-label="Square"
                >
                    <CropSquareIcon />
                </ToggleButton>
                <ToggleButton
                    value="Rectangle"
                    aria-label="Rectangle"
                >
                    <Crop32Icon />
                </ToggleButton>
                <ToggleButton
                    value="Text"
                    aria-label="Text"
                >
                    <TitleIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButton component="label" value={""}>
                <ImageIcon />
                <input
                    type="file"
                    hidden
                    accept="image/*"
                />
            </ToggleButton>
        </Paper>
    );
}

export default BottomToolbar;
