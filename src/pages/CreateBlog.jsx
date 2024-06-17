import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import BlogFields from "../components/BlogFields";
import { apiUrl } from "../../config/urlConfig";

const CreateBlog = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [blogState, setBlogState] = useState({
    title: undefined,
    summary: undefined,
    slug: undefined,
    category: undefined,
    isFeatured: false,
    status: "draft",
    thumbnail:
      "https://images.unsplash.com/photo-1718146356507-b9c832eeb106?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });
  let htmlcontent = stateToHTML(editorState.getCurrentContent());
  useEffect(() => {
    setIsBlogSaved(false);
  }, [htmlcontent]);
  let payload = {
    ...blogState,
    content: htmlcontent,
  };
  const [isBlogSaved, setIsBlogSaved] = useState(false);

  const handleBlogStateChange = (e) => {
    const { name, value } = e.target;
    setBlogState((prev) => {
      return { ...prev, [name]: value };
    });
    setIsBlogSaved(false);
  };

  const saveBlog = () => {
    axios
      .post(`${apiUrl}/api/blog/create`, payload, {
        headers: {
          Authorization: localStorage?.getItem("access_token"),
        },
      })
      .then((res) => {
        if (res.data._id) {
          setIsBlogSaved(true);
        }
      });
  };
  const publishBlog = () => {
    let updatePayload = { status: "published" };
    axios
      .put(`${apiUrl}/api/blog/update/${blogState.slug}`, updatePayload, {
        headers: {
          Authorization: localStorage?.getItem("access_token"),
        },
      })
      .then((res) => {
        if (res.data._id) {
          setIsBlogSaved(false);
        }
      });
  };
  const getSaveDisabled = () => {
    let disabled = true;

    if (
      blogState.title &&
      blogState.summary &&
      blogState.slug &&
      blogState.category &&
      blogState.thumbnail &&
      htmlcontent &&
      !isBlogSaved
    ) {
      disabled = false;
    }

    return disabled;
  };

  return (
    <BlogFields
      {...{
        getSaveDisabled,
        saveBlog,
        editorState,
        setEditorState,
        blogState,
        setBlogState,
        handleBlogStateChange,
        type: "Create",
        publishBlog,
        isBlogSaved,
        setIsBlogSaved,
      }}
    />
  );
};

export default CreateBlog;
