import { convertFromHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
import { DraftailEditor } from "draftail";
import "draftail/dist/draftail.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import useApiCall from "../../hooks/useApiCall";
import "./Draftail.css";


const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const Draftail = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const location = useLocation();
  const postId = location.search.split("=")[1];

  const editor = useRef();

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

  console.log(editorState);

  const onBlur = () => {
    let html = stateToHTML(editorState.getCurrentContent());
    props.value(html);
  };

  return (
    <div className="App">
      <DraftailEditor
        editorState={editorState}
        onChange={setEditorState}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        plugins={plugins}
        onBlur={onBlur}
        ref={editor}
      />
      <InlineToolbar />
      <SideToolbar />
    </div>
  );
};

export default Draftail;
