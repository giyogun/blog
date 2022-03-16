import React from "react";
import { DraftailEditor} from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

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

// const initial = JSON.parse(sessionStorage.getItem("draftail:content"));

const Draftail = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef();

  // const changeHandler = (e) => {
  //   setEditorState(e);
  //   // props.value(editor.current.editorRef.editor.editor.innerHTML);
  //   console.log(editor.current.editorRef.editor.editor.innerHTML);

  // };

  const onBlur = (x) => {
    // console.log(editor.current.editorRef.editor.editor.innerHTML);
    props.value(editor.current.editorRef.editor.editor.innerHTML)
  }

  // const onSave = (content) => {
  //   console.log(content);
  //   sessionStorage.setItem("draftail:content", JSON.stringify(content));
  // };

  return (
    <div className="App">
      <DraftailEditor
        // rawContentState={initial || null}
        // onSave={onSave}
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

// import React from "react";
// import { DraftailEditor } from "draftail";
// import { EditorState } from "draft-js";
// import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
// import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
// // import "./App.css";
// import "draft-js/dist/Draft.css";
// import "draftail/dist/draftail.css";
// import "draft-js-inline-toolbar-plugin/lib/plugin.css";
// import "draft-js-side-toolbar-plugin/lib/plugin.css";
// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;
// const sideToolbarPlugin = createSideToolbarPlugin();
// const { SideToolbar } = sideToolbarPlugin;
// const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

// class Draftail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//     this.changeState = this.changeState.bind(this);
//   }
//   changeState(state) {
//     this.setState({
//       editorState: state,
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         <DraftailEditor
//           editorState={this.state.editorState}
//           onChange={this.changeState}
//           placeholder="Tell your story..."
//           plugins={plugins}
//         />
//         <InlineToolbar />
//         <SideToolbar />
//       </div>
//     );
//   }
// }

export default Draftail;
