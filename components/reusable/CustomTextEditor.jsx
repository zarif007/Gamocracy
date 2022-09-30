import React, { useRef } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false
}); 

const CustomTextEditor = ({ value, setValue, defaultValue }) => {

  const config = {
    readonly: false 
  };

  const updateContent = (content) => {
    const updated = value;
    updated.content = content;
    setValue(updated)
  }

  const editor = useRef(defaultValue);
  return (
    <JoditEditor
        ref={editor}
        value={value.content}
        config={config || false}
        defaultValue={defaultValue}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => updateContent(newContent)} 
        onChange={newContent => updateContent(newContent)}
      />
  );
};

export default CustomTextEditor;
