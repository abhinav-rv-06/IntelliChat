import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

// Define a React component called 'MessageFormUI' which takes several props.
const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  // Initialize state for the message preview.
  const [preview, setPreview] = useState("");

  return (
    <div className="message-form-container">
      {/* Display a message preview if 'preview' state is not empty */}
      {preview && (
        <div className="message-form-preview">
          <img
            alt="message-form-preview"
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          {/* Input field for typing the message */}
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {/* Display an appended text if 'appendText' is not empty */}
          {appendText && (
            <input
              className="message-form-assist"
              type="text"
              disabled="disabled"
              value={`${message} ${appendText}`}
            />
          )}
        </div>
        <div className="message-form-icons">
          {/* Dropzone component for attaching images */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {/* Icon for opening the file picker */}
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          {/* Icon for submitting the message */}
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Export the 'MessageFormUI' component as the default export.
export default MessageFormUI;
