import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useHistory, useLocation } from "react-router";
import EditorContainer from "../../components/draftjs/EditorContainer";
import PostsContext from "../../context/postsContext";
import useApiCall from "../../hooks/useApiCall";
import Select from "react-select";

import classes from "./Write.module.css";
import Card from "./ui/Card";

function Write(props) {
  const ls = JSON.parse(localStorage.getItem("user"));
  const ctx = useContext(PostsContext);
  const [selectedFile, setSelectedFile] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [cats, setCats] = useState([]);
  const [isEditState, setIsEditState] = useState(false);
  const titleRef = useRef();
  const [bodyText, setBodyText] = useState(null);
  const [rawBodyText, setRawBodyText] = useState(null);
  const postId = location.search.split("=")[1];
  const publicFolder = "http://localhost:5000/images/";

  const uploadImage = useCallback((data) => {}, []);
  const { _id } = ls;

  const getOnePost = useCallback(
    (res) => {
      if (res.statusText) {
        const x = res.data.userId === _id;
        if (!x) {
          history.push("/write");
        }
        setIsEditState(x);
        setPost(res.data);
        console.log(res.data);
      } else {
        history.push("/write");
      }
    },
    [history, _id]
  );

  const { queryPosts: singlePostQuery } = useApiCall(getOnePost);
  const { queryPosts: uploadImageQuery } = useApiCall(uploadImage);

  useEffect(() => {
    if (postId) {
      singlePostQuery({
        method: "GET",
        url: `http://localhost:5000/api/posts/${postId}`,
      });
    }
  }, [singlePostQuery, postId]);

  const postHandler = (e) => {
    e.preventDefault();
    const newTitle = titleRef.current.value;

    if (!bodyText || !newTitle) {
      window.alert("Please fill all fields");
      return;
    }

    if (isEditState) {
      const updatedPost = {
        title: newTitle,
        description: bodyText,
        rawDescription: JSON.stringify(rawBodyText),
        id: post._id,
        username: post.username,
      };

      if (cats.length > 0) {
        updatedPost.categories = cats;
      }

      if (selectedFile) {
        const data = new FormData();
        const filename = Date.now() + selectedFile.name;
        data.append("name", filename);
        data.append("file", selectedFile);
        updatedPost.photo = filename;
        if (!bodyText || !newTitle) {
          window.alert("Please fill all fields");
          return;
        } else {
          uploadImageQuery({
            url: `http://localhost:5000/api/upload`,
            method: "POST",
            body: data,
          });
        }
      }
      if (bodyText && newTitle) {
        ctx.updatePost(updatedPost);
      }
    } else {
      const newPost = {
        title: newTitle,
        description: bodyText,
        rawDescription: JSON.stringify(rawBodyText),
        username: ls.username,
        userId: _id,
      };

      if (cats.length > 0) {
        newPost.categories = cats;
      }

      if (selectedFile) {
        const data = new FormData();
        const filename = Date.now() + selectedFile.name;
        data.append("name", filename);
        data.append("file", selectedFile);
        newPost.photo = filename;
        if (!bodyText || !newTitle) {
          window.alert("Please fill all fields");
          return;
        } else {
          uploadImageQuery({
            url: `http://localhost:5000/api/upload`,
            method: "POST",
            body: data,
          });
        }
      }
      if (bodyText.length === 11 || !newTitle) {
        window.alert("Please fill all fields");
      } else if (bodyText.length <= 509) {
        window.alert("You need to type at least 100 words!");
      } else {
        ctx.createPost(newPost);
        console.log(newPost);
        localStorage.setItem("testData", JSON.stringify(rawBodyText));
        localStorage.setItem("pData", JSON.stringify(newPost));
      }
    }
  };

  const changeHandler = (e) => {
    const x = e.target.files[0].name;
    const y = /\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/;

    if (x.match(y)) {
      setSelectedFile(e.target.files[0]);
    } else {
      window.alert("Only images allowed");
    }
    console.log(bodyText);
    console.log(rawBodyText);
  };

  let pic;
  if (postId) {
    pic = publicFolder + post.photo;
    if (!post.photo) {
      pic =
        "https://presentageministries.org/wp-content/uploads/2019/07/placeholder.png";
    }
    if (selectedFile) {
      pic = URL.createObjectURL(selectedFile);
    }
  } else {
    pic =
      "https://presentageministries.org/wp-content/uploads/2019/07/placeholder.png";
    if (selectedFile) {
      pic = URL.createObjectURL(selectedFile);
    }
  }

  const [isMaxedOut, setIsMaxedOut] = useState();

  const options = [
    { value: "music", label: "Music" },
    { value: "tech", label: "Tech" },
    { value: "cinema", label: "Cinema" },
    { value: "life", label: "Life" },
    { value: "sport", label: "Sport" },
    { value: "style", label: "Style" },
  ];

  const alt = [
    { name: "life", label: "Life" },
    { name: "sport", label: "Sport" },
    { name: "music", label: "Music" },
  ];

  const another = [
    {
      _id: "621e24e8d0269f9b0b4902cd",
      value: "music",
      label: "Music",
    },
    {
      _id: "621e24e8d0269f9b0b4902cdw",
      value: "tech",
      label: "Tech",
    },
    {
      _id: "621e24e8d0269f9b0b4902cd1",
      value: "life",
      label: "Life",
    },
  ];

  another.map((m) => {
    m.newName = m.value;
    delete m.value;
  });

  return (
    <Card>
      <div className={classes.control}>
        <img src={pic} alt="article header" className={classes.writeImg} />
      </div>

      <form className={classes.form} onSubmit={postHandler}>
        <div className={classes.control}>
          <label htmlFor="fileInput">
            <MdAddCircleOutline className={classes.writeIcon} />
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG"
            style={{ display: "none" }}
            onChange={changeHandler}
          />
          <input
            type="text"
            placeholder={!isEditState ? "Title" : ""}
            defaultValue={isEditState ? post.title : ""}
            ref={titleRef}
            className={classes.writeInput}
            autoFocus={true}
          />
        </div>
        <div className={classes.editor}>
          <EditorContainer
            placeholder={!isEditState ? "Tell your story..." : ""}
            defaultValue={isEditState ? bodyText : ""}
            value={(enteredText) => setBodyText(enteredText)}
            inner={(text) => setRawBodyText(text)}
          />
          {/* <Draftail
          placeholder={!isEditState ? "Tell your story..." : ""}
          defaultValue={isEditState ? bodyText : ""}
          value={(enteredText) => setBodyText(enteredText)}
        /> */}
          {/* <MyEditor
            placeholder={!isEditState ? "Tell your story..." : ""}
            defaultValue={isEditState ? bodyText : ""}
            value={(enteredText) => setBodyText(enteredText)}
            inner={(text) => setInner(text)}
          /> */}
          {/* <RichEditor /> */}
          {/* <AltEditor /> */}
          <Select
            options={isMaxedOut ? [] : ctx.categories}
            isClearable={true}
            isMulti={true}
            isSearchable={true}
            placeholder="Select a category..."
            onChange={(e) => {
              setCats(e);
              if (e.length === 2) setIsMaxedOut(true);
              if (e.length < 2) setIsMaxedOut(false);
              console.log(ctx.categories);
            }}
            noOptionsMessage={() => "Maximum of two options allowed"}
            defaultValue={post?.categories}
          />
        </div>
        <div className={classes.actions}>
          <button>Publish</button>
        </div>
      </form>
    </Card>
  );
}

export default Write;
