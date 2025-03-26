import {Circle, Layer, Rect, Stage, Transformer} from "react-konva";
import {useEffect, useRef, useState} from "react";

const Canvas = ({isPanMode, setPanMode, canvasSize, selectedShape}) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({x: 0, y: 0});
    const [shapes, setShapes] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const transformerRef = useRef();
    const shapeRefs = useRef(new Map());

    useEffect(() => {
        const handleWheel = (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
                setScale((prevScale) => Math.min(Math.max(prevScale + (event.deltaY > 0 ? -0.1 : 0.1), 0.5), 3));
            }
        };
        window.addEventListener("wheel", handleWheel, {passive: false});
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    const handleMouseDown = (event) => {
        if (isPanMode) {
            setIsDragging(true);
            setStartDrag({x: event.clientX - position.x, y: event.clientY - position.y});
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging && isPanMode) {
            setPosition({x: event.clientX - startDrag.x, y: event.clientY - startDrag.y});
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (selectedShape && selectedShape !== 'pan') {
            const newShape = {
                id: `shape-${shapes.length + 1}`,
                x: 100,
                y: 100,
                fill: "orange",
                type: selectedShape,
                ...(selectedShape === "rect" ? {width: 100, height: 80} : {radius: 50})
            };
            setShapes([...shapes, newShape]);
        }
    }, [selectedShape]);

    useEffect(() => {
        if (transformerRef.current) {
            const nodes = selectedIds.map((id) => shapeRefs.current.get(id)).filter(Boolean);
            transformerRef.current.nodes(nodes);
        }
    }, [selectedIds]);

    const handleStageClick = (e) => {
        if (e.target === e.target.getStage()) {
            setSelectedIds([]);
            return;
        }
        if (!e.target.hasName("shape")) return;

        setPanMode(false)
        const clickedId = e.target.id();
        console.log(clickedId)
        const metaPressed = e.evt.ctrlKey || e.evt.metaKey;
        setSelectedIds(metaPressed ? [...selectedIds, clickedId] : [clickedId]);
    };

    const handleDragEnd = (e) => {
        setShapes(shapes.map(shape => shape.id === e.target.id() ? {
            ...shape,
            x: e.target.x(),
            y: e.target.y()
        } : shape));
    };

    const handleTransformEnd = () => {
        const nodes = transformerRef.current.nodes();
        setShapes(shapes.map(shape => {
            const node = nodes.find(n => n.id() === shape.id);
            if (!node) return shape;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            return shape.type === "rect"
                ? {...shape, x: node.x(), y: node.y(), width: shape.width * scaleX, height: shape.height * scaleY}
                : {...shape, x: node.x(), y: node.y(), radius: shape.radius * scaleX};
        }));
    };

    return (
        <div
            style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                background: "white",
                overflow: "hidden",
                position: "relative",
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "top left",
                cursor: isPanMode ? (isDragging ? "grabbing" : "grab") : "default"
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Stage
                width={canvasSize.width}
                height={canvasSize.height}
                onClick={handleStageClick}
            >
                <Layer>
                    {/* Background */}
                    <Rect
                        x={0}
                        y={0}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        fill="white"
                        listening={false}
                    />

                    {/* Shapes */}
                    {shapes.map((shape) =>
                        shape.type === "rect" ? (
                            <Rect
                                key={shape.id}
                                id={shape.id}
                                x={shape.x}
                                y={shape.y}
                                width={shape.width}
                                height={shape.height}
                                fill={shape.fill}
                                name="shape"
                                draggable
                                ref={(node) => node && shapeRefs.current.set(shape.id, node)}
                                onDragEnd={handleDragEnd}
                            />
                        ) : (
                            <Circle
                                key={shape.id}
                                id={shape.id}
                                x={shape.x}
                                y={shape.y}
                                radius={shape.radius}
                                fill={shape.fill}
                                name="shape"
                                draggable
                                ref={(node) => node && shapeRefs.current.set(shape.id, node)}
                                onDragEnd={handleDragEnd}
                            />
                        )
                    )}
                    <Transformer ref={transformerRef} onTransformEnd={handleTransformEnd}/>
                </Layer>
            </Stage>
        </div>
    );
};

export default Canvas;
