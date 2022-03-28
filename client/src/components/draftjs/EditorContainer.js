import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML } from "draft-convert";
import { stateToHTML } from "draft-js-export-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./EditorContainer.css";
import { useLocation } from "react-router";
import useApiCall from "../../hooks/useApiCall";

const EditorContainer = ({ defaultValue, placeholder, value, inner }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const location = useLocation();
  const postId = location.search.split("=")[1];
  const editor = useRef();
  const x = location.pathname.split("/")[1];

  const getOnePost = useCallback((res) => {
    if (res.statusText === "OK") {
      setEditorState(
        EditorState.createWithContent(convertFromHTML(res.data.description))
      );
    }
  }, []);

  const { queryPosts: singlePostQuery } = useApiCall(getOnePost);

  useEffect(() => {
    if (postId) {
      singlePostQuery({
        method: "GET",
        url: `http://localhost:5000/api/posts/${postId}`,
      });
    }
  }, [singlePostQuery, postId]);

  useEffect(() => {
    let html = stateToHTML(editorState.getCurrentContent());
    value(html);
  }, [value, editorState]);

  console.log(x);

  const uploadImageCallback = (file) => {
    // return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("POST", "http://localhost:5000/api/upload");
    //   // xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   // await axios.post("http://localhost:5000/api/upload", data);
    //   xhr.send(data);
    //   xhr.addEventListener("load", () => {
    //     const response = JSON.parse(xhr.responseText);
    //     console.log(response);
    //     resolve(response);
    //   });
    //   xhr.addEventListener("error", () => {
    //     const error = JSON.parse(xhr.responseText);
    //     console.log(error);
    //     reject(error);
    //   });
    // });
    var imgSrc = prompt("Enter image location", "");
    imgSrc.height = "100px";
    imgSrc.width = "50px";
    document.execCommand();
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        placeholder={placeholder}
        defaultValue={defaultValue}
        wrapperClassName="demo-wrapper"
        onChange={() => {
          console.log(editor.current.editor.editor.innerText);
          inner(editor.current.editor.editor.innerText);
          // value(editor.current.editor.editor.innerText);
        }}
        ref={editor}
        toolbar={{
          options:
            x === "settings"
              ? ["list", "textAlign"]
              : [
                  "inline",
                  "blockType",
                  "list",
                  "textAlign",
                  "fontSize",
                  "list",
                  "link",
                  "embedded",
                  "image",
                ],
          inline: {
            inDropdown: true,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
          blockType: { inDropdown: false, options: ["H1", "H2", "H3"] },
          list: { inDropdown: true },
          // textAlign: { inDropdown: true },
          // link: { inDropdown: true },
          // // history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallback,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  );
};

export default EditorContainer;
