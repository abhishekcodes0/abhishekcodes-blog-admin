import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../config/urlConfig";
import BlogFields from "../components/BlogFields";
import { useParams } from "react-router-dom";

const Page = () => {
  const { slug } = useParams();

  const [blogState, setBlogState] = useState({
    title: undefined,
    summary: undefined,
    slug: undefined,
    category: undefined,
    isFeatured: false,
    status: "draft",
    thumbnail:
      "https://images.unsplash.com/photo-1718146356507-b9c832eeb106?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: undefined,
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
        }
      });
    return () => {
      if (newCancelToken) {
        newCancelToken.cancel("Component unmounted.");
      }
    };
  }, []);

  let payload = {
    ...blogState,
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
    const modifiedcontent = payload.content.replace(
      /<h2[^>]*>(.*?)<\/h2>/g,
      (match, group) => {
        const id = group.toLowerCase().replace(/\s+/g, "-"); // Generate ID from text
        console.log("group", group, id);
        return `<h2 id="${id}">${group}</h2>`;
      }
    );
    let updatePayload = {
      title: payload.title,
      status: "draft",
      summary: payload.summary,
      slug: payload.slug,
      category: payload.category,
      isFeatured: payload.isFeatured,
      thumbnail: payload.thumbnail,
      content: modifiedcontent,
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
      blogState.content &&
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
