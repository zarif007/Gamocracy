import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, EditorState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
)

const TextEditor = ({ value, setValue, defaultValue }: any) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);

    const updated = value;
    updated.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setValue(updated);
  }

  useEffect(() => {
    setEditorState(EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(value.content).contentBlocks,
        convertFromHTML(value.content).entityMap
      )
    ))
  }, [])

  return (
    <>
    <Editor 
      toolbarClassName='!bg-black !text-black !border-2 !border-[#e2e8f0] !rounded-md' 
      editorClassName='text-white !border-2 !border-[#e2e8f0] !rounded-md'
      onEditorStateChange={onEditorStateChange}
      editorState={editorState}
       />
    </>
  )
}

export default TextEditor