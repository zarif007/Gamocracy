import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ value, setValue, defaultValue }: any) => {
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_APIKEY}
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
        initialValue={defaultValue}
        init={{
          height: 250,
          menubar: false,
          plugins:
            "powerpaste casechange searchreplace emoticons autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker help formatpainter permanentpen charmap linkchecker emoticons advtable export print autosave",
          toolbar:
            "undo redo print spellcheckdialog emoticons formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={() => {
          if (editorRef.current) {
            const updated = value;
            updated.content = editorRef.current.getContent();
            setValue(updated)
          }
        }}
      />
    </div>
  );
};

export default TextEditor;
