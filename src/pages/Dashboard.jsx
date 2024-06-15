import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../../config/urlConfig";
import { transformDate } from "../../misc/functions";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/api/blog/get/all`).then((res) => {
      if (res.data) {
        setBlogs(res.data);
      }
    });
  }, []);
  return (
    <section className="mt-8 px-24 mt-16">
      <h2 className="font-semibold mb-12 text-4xl text-center mt-20 relative">
        Blogs
        <Link
          className="absolute right-0 top-0 bg-black text-white px-4 py-2 rounded text-sm"
          to={`/admin/create-blog`}
        >
          Create Blog
        </Link>
      </h2>

      <div className="mb-4">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.map((blog) => {
              return (
                <div
                  className="w-full rounded flex justify-start flex-col"
                  key={blog._id}
                >
                  <img
                    className="w-full h-[200px] object-cover"
                    src={blog.thumbnail}
                  />

                  <div className="flex flex-col">
                    <div className="text-sm text-gray-400 mt-2">
                      {transformDate(blog.createdAt)}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-wrap">
                      {blog.title}
                    </h3>
                    <p className="text-wrap">{blog.summary}</p>

                    <Link
                      className="mt-4 text-blue-600"
                      to={`/admin/blog?slug=${blog.slug}`}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center p-52 text-3xl bg-gray-50">Create a Blog</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
