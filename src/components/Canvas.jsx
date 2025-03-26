import React, { useState, useEffect } from "react";

function Canvas({ isPanMode, canvasSize }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleWheel = (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
                setScale((prevScale) => Math.min(Math.max(prevScale + (event.deltaY > 0 ? -0.1 : 0.1), 0.5), 3));
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const handleMouseDown = (event) => {
        if (isPanMode) {
            setIsDragging(true);
            setStartDrag({ x: event.clientX - position.x, y: event.clientY - position.y });
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging && isPanMode) {
            setPosition({ x: event.clientX - startDrag.x, y: event.clientY - startDrag.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center",
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                cursor: isPanMode ? (isDragging ? "grabbing" : "grab") : "default"
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Your main content goes here */}
        </div>
    );
}

export default Canvas;
