import React, { useCallback, useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML } from "draft-convert";
import { stateToHTML } from "draft-js-export-html";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import './EditorContainer.css'
import { useLocation } from "react-router";
import useApiCall from "../../hooks/useApiCall";

const EditorContainer = ({defaultValue, placeholder, value}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const location = useLocation();
  const postId = location.search.split("=")[1];

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
    console.log(111);
  }, [value, editorState]);

  const uploadImageCallback = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/api/upload");
      // xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      // await axios.post("http://localhost:5000/api/upload", data);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  };

    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          placeholder={placeholder}
          defaultValue={defaultValue}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              // uploadCallback: this.uploadImageCallback,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    );
}

export default EditorContainer;