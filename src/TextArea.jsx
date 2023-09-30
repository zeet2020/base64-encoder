import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function TextArea({ legend, onChange, result }) {
  const isInput = legend === "Input";

  const onUpdate = (e) => {
    onChange(e.target.value);
  };

  return (
    <fieldset>
      <legend>{legend}</legend>
      {isInput ? (
        <textarea rows="5" onChange={onUpdate} />
      ) : (
        <textarea rows="5" value={result} readOnly={true} />
      )}
    </fieldset>
  );
}

export default TextArea;
