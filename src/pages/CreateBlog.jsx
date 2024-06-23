import { useState, useEffect } from "react";

import axios from "axios";
import BlogFields from "../components/BlogFields";
import { apiUrl } from "../../config/urlConfig";

const CreateBlog = () => {
  const [blogState, setBlogState] = useState({
    title: undefined,
    summary: undefined,
    slug: undefined,
    category: undefined,
    isFeatured: false,
    status: "draft",
    thumbnail:
      "https://images.unsplash.com/photo-1718146356507-b9c832eeb106?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
  });

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

  const saveBlog = () => {
    const modifiedcontent = payload.content.replace(
      /<h2[^>]*>(.*?)<\/h2>/g,
      (match, group) => {
        const id = group.toLowerCase().replace(/\s+/g, "-"); // Generate ID from text
        console.log("group", group, id);
        return `<h2 id="${id}">${group}</h2>`;
      }
    );
    axios
      .post(
        `${apiUrl}/api/blog/create`,
        { ...payload, content: modifiedcontent },
        {
          headers: {
            Authorization: localStorage?.getItem("access_token"),
          },
        }
      )
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
        saveBlog,
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
