import React from "react";
import "./input.css";

const InputFile = ({ onChange, accept }) => {
  return (
    <div className="input-container">
      <label className="label">Choose a video file:</label>
      <input
        type="file"
        onChange={onChange}
        accept={accept}
        className="input-file"
      />
    </div>
  );
};

export default InputFile;
