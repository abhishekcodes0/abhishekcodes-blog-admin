import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import axios from "axios";
import { apiUrl } from "../../config/urlConfig";
import BlogFields from "../components/BlogFields";
import { useParams } from "react-router-dom";

const Page = () => {
  const { slug } = useParams();

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

  const [cancelToken, setCancelToken] = useState(null);
  useEffect(() => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled by the user.");
    }
    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);
    axios
      .get(`${apiUrl}/api/blog/get/${slug}`, {
        cancelToken: newCancelToken.token,
      })
      .then((res) => {
        if (res.data?._id) {
          setBlogState(res.data);
          let contentState = stateFromHTML(res.data.content);
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
        }
      });
    return () => {
      if (newCancelToken) {
        newCancelToken.cancel("Component unmounted.");
      }
    };
  }, []);

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

  const updateBlog = () => {
    let updatePayload = {
      title: payload.title,
      status: "draft",
      summary: payload.summary,
      slug: payload.slug,
      category: payload.category,
      isFeatured: payload.isFeatured,
      thumbnail: payload.thumbnail,
      content: htmlcontent,
    };
    axios
      .put(`${apiUrl}/api/blog/update/${blogState.slug}`, updatePayload, {
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
        saveBlog: updateBlog,
        editorState,
        setEditorState,
        blogState,
        setBlogState,
        handleBlogStateChange,
        type: "Edit",
        publishBlog,
        isBlogSaved,
        setIsBlogSaved,
      }}
    />
  );
};

export default Page;
