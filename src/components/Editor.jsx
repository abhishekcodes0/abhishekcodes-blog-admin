import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { apiUrl } from "../../config/urlConfig";

const RichTextEditor = ({ editorState, setEditorState }) => {
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleImageUpload = (file) => {
    console.log("did it run");
    // Define your image upload logic here
    const formData = new FormData();
    formData.append("image", file);

    return axios
      .post(`${apiUrl}/api/blog/upload-image`, formData, {
        headers: {
          Authorization: localStorage?.getItem("access_token"),
        },
      })
      .then((res) => {
        return { data: { link: res?.data?.url } };
      });
  };

  return (
    <div className="h-[500px]">
      <Editor
        wrapperClassName="h-full"
        toolbarClassName="h-1/5"
        editorClassName="h-4/5 bg-gray-50 p-4"
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          image: {
            uploadCallback: handleImageUpload,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    </div>
  );
};

export default RichTextEditor;
