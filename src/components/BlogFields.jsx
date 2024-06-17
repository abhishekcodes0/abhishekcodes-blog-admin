import Editor from "./Editor";

const BlogFields = ({
  getSaveDisabled,
  saveBlog,
  editorState,
  setEditorState,
  blogState,
  setBlogState,
  handleBlogStateChange,
  type,
  publishBlog,
  isBlogSaved,
  setIsBlogSaved,
}) => {
  return (
    <section className="mt-8 px-24 mt-16 h-full">
      <h2 className="font-semibold mb-12 text-4xl text-center mt-20 relative">
        {type} Blog
        <div className="absolute right-0 top-0 flex gap-2">
          <button
            className={`border border-black px-4 py-2 rounded text-sm ${
              getSaveDisabled() ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
            onClick={saveBlog}
            disabled={getSaveDisabled()}
          >
            save
          </button>
          <button
            className={` text-white px-4 py-2 rounded text-sm ${
              !isBlogSaved ? "bg-gray-600 cursor-not-allowed" : "bg-black"
            }`}
            onClick={publishBlog}
            disabled={!isBlogSaved}
          >
            Publish
          </button>
        </div>
      </h2>

      <div className="flex gap-2 w-full h-full ">
        <div className="w-1/2 h-full">
          <div className="text-lg font-medium">Content</div>

          <Editor editorState={editorState} setEditorState={setEditorState} />
        </div>

        <div className="w-1/2 flex flex-col px-8">
          <div className="mb-4">
            <label className="text-lg font-medium" htmlFor="title">
              Title
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="text"
              placeholder="Enter your title"
              name="title"
              value={blogState.title}
              onChange={handleBlogStateChange}
              autoComplete="new-title"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium" htmlFor="summary">
              Summary
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="text"
              placeholder="Enter your summary"
              name="summary"
              value={blogState.summary}
              onChange={handleBlogStateChange}
              autoComplete="new-summary"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium" htmlFor="slug">
              Slug
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="text"
              placeholder="Enter your slug"
              name="slug"
              value={blogState.slug}
              onChange={handleBlogStateChange}
              autoComplete="new-slug"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium" htmlFor="category">
              Category
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="text"
              placeholder="Enter your category"
              name="category"
              value={blogState.category}
              onChange={handleBlogStateChange}
              autoComplete="new-category"
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium" htmlFor="isFeatured">
              Is Featured
            </label>
            <div className="mt-2">
              <label
                className={`radio-button cursor-pointer mr-2 ${
                  blogState.isFeatured === true ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  value={true}
                  checked={blogState.isFeatured === true}
                  onChange={() => {
                    setIsBlogSaved(false);
                    setBlogState((prev) => {
                      return { ...prev, isFeatured: true };
                    });
                  }}
                  className="mr-1"
                />
                Yes
              </label>
              <label
                className={`radio-button cursor-pointer ${
                  blogState.isFeatured === false ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  value={false}
                  checked={blogState.isFeatured === false}
                  onChange={() => {
                    setIsBlogSaved(false);
                    setBlogState((prev) => {
                      return { ...prev, isFeatured: false };
                    });
                  }}
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium" htmlFor="thumbnail">
              Thumbnail
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="text"
              placeholder="Enter your thumbnail"
              name="thumbnail"
              value={blogState.thumbnail}
              onChange={handleBlogStateChange}
              autoComplete="new-thumbnail"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogFields;
