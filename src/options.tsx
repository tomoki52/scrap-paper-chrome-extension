import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [project, setProject] = useState("");

  const [saveProject, setSaveProject] = useState("");
  chrome.storage.sync.get("project", (value) => {
    setSaveProject(value["project"]);
  });

  const onClickSaveProject = () => {
    setSaveProject(project);
    chrome.storage.sync.set({ project: project });
  };
  return (
    <>
      <p>option</p>

      <input
        type="text"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />
      <button onClick={onClickSaveProject}>save</button>
      <p>saved project name: {saveProject}</p>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
