import React from "react";
import { DraftailEditor } from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import { stateToHTML } from "draft-js-export-html";

import "./Draftail.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import { useState } from "react";
import { useRef } from "react";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [inlineToolbarPlugin, sideToolbarPlugin];


const Draftail = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef();

  const onBlur = (x) => {
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
