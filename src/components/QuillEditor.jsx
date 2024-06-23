import React, { useState, useMemo, useRef, useCallback } from "react";
import Editor from "react-quill";
import axios from "axios";
import { apiUrl } from "../../config/urlConfig";

import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ blogState, setBlogState }) => {
  const quill = useRef();

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Make a POST request to your server to upload the image to S3
        const response = await axios.post(
          `${apiUrl}/api/blog/upload-image`,
          formData,
          {
            headers: {
              Authorization: localStorage?.getItem("access_token"),
            },
          }
        );
        // Get the uploaded image URL from the response
        const imageUrl = response.data.url;

        // Insert the image URL into the editor at the current cursor position
        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ direction: "rtl" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["code-block"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
    "code-block",
  ];
  return (
    <div className="h-[500px]">
      <Editor
        ref={(el) => (quill.current = el)}
        className="h-full"
        theme="snow"
        formats={formats}
        modules={modules}
        value={blogState.content}
        onChange={(value) =>
          setBlogState((prev) => {
            return { ...prev, content: value };
          })
        }
      />
    </div>
  );
};

export default QuillEditor;
