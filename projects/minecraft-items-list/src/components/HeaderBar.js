import React, { useRef, useState } from "react";
import "../styles/HeaderBar.css";

function HeaderBar({ handleDarkModeClick, handleImportFile }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const [file] = event.dataTransfer.files;
    if (file) handleImportFile(file);
  };

  return (
    <div className='header-bar'>
      <h1>Minecraft Items List</h1>

      <span className='header-buttons'>
        <button
          type='button'
          className={`import-button${isDragging ? " is-dragging" : ""}`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={(event) => event.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsDragging(false);
            }
          }}
          onDrop={handleDrop}>
          {isDragging ? "Drop JSON here" : "Import or Drag and Drop"}
        </button>
        <input
          ref={fileInputRef}
          className='import-file-input'
          type='file'
          accept='.json,application/json'
          onChange={(event) => {
            const [file] = event.target.files;
            if (file) handleImportFile(file);
            event.target.value = "";
          }}
        />

        <button className='dark-mode-toggle' onClick={handleDarkModeClick}>
          <svg width='100%' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 496'>
            <path
              fill='var(--foreground)'
              d='M8,256C8,393,119,504,256,504S504,393,504,256,393,8,256,8,8,119,8,256ZM256,440V72a184,184,0,0,1,0,368Z'
              transform='translate(-8 -8)'
            />
          </svg>
        </button>
      </span>
    </div>
  );
}

export default HeaderBar;
