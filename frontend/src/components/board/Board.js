import React, { useRef, useState, useEffect } from "react";
import "./Canvas.css";
import { Link, useParams, NavLink } from "react-router-dom";

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [xoffset, SetXOffset] = useState(0);
  const [yoffset, SetYOffset] = useState(650);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState("3");
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const textAreaRef = useRef(null);
  const timeout = useRef(null);
  const [cursor, setCursor] = useState("default");
  const [text, setText] = useState("gjhgh");
  const { id } = useParams();

  const onFullScreen = (e) => {
    e.stopPropagation();

    console.log("id " + id);
  };
  useEffect(() => {
    console.log("id " + id);
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //Load from locastorage
    const canvasimg = localStorage.getItem("canvasimg-" + id);
    if (canvasimg) {
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }
    if (isWriting) {
      const textArea = textAreaRef.current.focus;
    }
  }, [ctx]);

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    draw(nativeEvent);
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg-" + id, base64ImageData);
    }, 400);
  };

  const clearCanvas = () => {
    localStorage.removeItem("canvasimg-" + id);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Passing clear screen
    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg-" + id, base64ImageData);
    }, 400);
  };

  const getPen = () => {
    setCursor("default");
    setSize("3");
    setColor("#3B3B3B");
  };

  const eraseCanvas = () => {
    setCursor("grab");
    setSize("20");
    setColor("#FFFAFF");

    if (!isDrawing) {
      return;
    }
  };

  // write text
  const startWrite = () => {
    setIsDrawing(false);
    setIsWriting(true);
  };
  const finishWrite = ({ nativeEvent }) => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    ctx.current.fillStyle = "blue";
    ctx.current.font = "bold 16px Arial";
    ctx.current.textAlign = "center";
    ctx.current.textBaseline = "middle";
    ctx.current.fillText(text, nativeEvent.clientX, nativeEvent.clientY);
    console.log(text + "  fin");
    setIsWriting(false);
  };

  // drag
  const draggingOver = (e) => {
    e.preventDefault();
    console.log("Dragging" + text);
  };

  const dragStart = (e) => {
    console.log("drag" + e.target.id);
    e.dataTransfer.setData("x-axis", e.clientX);
    e.dataTransfer.setData("y-axis", e.clientY);
  };
  const onDragDropped = (e) => {
    let xAxis = e.dataTransfer.getData("x-axis");
    let yAxis = e.dataTransfer.getData("y-axis");
    SetXOffset(xAxis);
    SetYOffset(yAxis);
    console.log(xAxis + " " + yAxis);
  };
  // to download the image
  const onDownloadIamge = (e) => {
    let link = e.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };
  return (
    <>
      <div className="canvas-btn">
        <button onClick={getPen} className="btn-width">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <div className="btn-width">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <select
            className="btn-width"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
        <button onClick={clearCanvas} className="btn-width">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>
        </button>
        <div>
          <button onClick={eraseCanvas} className="btn-width">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eraser-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
            </svg>
          </button>
        </div>

        {/* // text button */}
        <button className="btn-width" onClick={startWrite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-badge-ar-fill"
            viewBox="0 0 16 16"
          >
            <path d="m6.031 8.574-.734-2.426h-.052L4.51 8.574h1.52zm3.642-2.641v1.938h1.033c.66 0 1.068-.316 1.068-.95 0-.64-.422-.988-1.05-.988h-1.05z" />
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm4.265 5.458h2.004L6.739 11H8L5.996 5.001H4.607L2.595 11h1.2l.47-1.542zM8.5 5v6h1.173V8.763h1.064L11.787 11h1.327L11.91 8.583C12.455 8.373 13 7.779 13 6.9c0-1.147-.773-1.9-2.105-1.9H8.5z" />
          </svg>
        </button>

        {/* end */}
        <NavLink to={`/board/${id}`} target="_blank" onClick={onFullScreen}>
          <button className="btn-width">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-fullscreen"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </NavLink>

        <a id="download-image" href="download-link" onClick={onDownloadIamge}>
          <button className="btn-width">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </button>
        </a>
      </div>
      {isWriting ? (
        <textarea
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            left: `${xoffset}px`,
            top: `${yoffset}px`,
          }}
          draggable
          onChange={(e) => setText(e.target.value)}
          onBlur={finishWrite}
          onDragStart={(e) => dragStart(e)}
        />
      ) : null}

      <h2>{id}</h2>
      <canvas
        droppable
        onDragOver={(e) => draggingOver(e)}
        onDrop={(e) => onDragDropped(e)}
        style={{ cursor: cursor }}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        ref={canvasRef}
      ></canvas>
    </>
  );
}
