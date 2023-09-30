import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import TextArea from "./TextArea.jsx";

function App() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(false);

  const convert = async (e) => {
    e.preventDefault();
    let result = await invoke("encrypt_or_decrypt", {
      text: input,
      password,
      encrypt: !mode,
    });
    setOutput(result);
  };

  const onUpdate = (e) => {
    setMode(e.target.checked);
  };

  return (
    <div className="component-file">
      <article className="text-input">
        <TextArea legend="Input" onChange={setInput} />
      </article>
      <article>
        <div className="middle-component">
          <div className="switch">
            <label htmlFor="switch">
              <input
                type="checkbox"
                id="switch"
                name="switch"
                role="switch"
                checked={mode}
                onChange={onUpdate}
              />
              Encrypt / Decrypt
            </label>
          </div>
          <div className="encrypt-pass">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
          </div>
          <div className="encrypt-btn">
            <a href="#" onClick={convert} role="button">
              {mode ? "Decrypt" : "Encrypt"}
            </a>
          </div>
        </div>
      </article>
      <article className="text-output">
        <TextArea legend="Output" result={output} />
      </article>
    </div>
  );
}

export default App;
