import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react")); 

const CustomTextEditor = ({ value, setValue, defaultValue }) => {

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  };

  const updateContent = (content) => {
    const updated = value;
    updated.content = content;
    setValue(updated)
  }

  const editor = useRef(null);
  return (
    <JoditEditor
        ref={editor}
        value={value.content}
        config={config || false}
        defaultValue={defaultValue}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => updateContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => updateContent(newContent)}
      />
  );
};

export default CustomTextEditor;
