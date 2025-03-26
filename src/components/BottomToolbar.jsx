import React from "react";
import {Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import TitleIcon from "@mui/icons-material/Title";
import ImageIcon from "@mui/icons-material/Image";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Crop32Icon from '@mui/icons-material/Crop32';
import NearMeIcon from '@mui/icons-material/NearMe';

function BottomToolbar({setPanMode, shape, setShape}) {
    const handleShapeChange = (event, newShape) => {
        if (newShape) {
            setShape(newShape);

            if (newShape === "pan") {
                setPanMode(true);
            } else {
                setPanMode(false);
            }
        }
    };

    return (<Paper sx={{
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
                    value="pan"
                    aria-label="Pan Mode"
                >
                    <NearMeIcon/>
                </ToggleButton>

                <ToggleButton
                    value="circle"
                    aria-label="Circle"
                >
                    <PanoramaFishEyeIcon/>
                </ToggleButton>
                <ToggleButton
                    value="square"
                    aria-label="Square"
                >
                    <CropSquareIcon/>
                </ToggleButton>
                <ToggleButton
                    value="rectangle"
                    aria-label="Rectangle"
                >
                    <Crop32Icon/>
                </ToggleButton>
                <ToggleButton
                    value="text"
                    aria-label="Text"
                >
                    <TitleIcon/>
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButton component="label" value={""}>
                <ImageIcon/>
                <input
                    type="file"
                    hidden
                    accept="image/*"
                />
            </ToggleButton>
        </Paper>);
}

export default BottomToolbar;
