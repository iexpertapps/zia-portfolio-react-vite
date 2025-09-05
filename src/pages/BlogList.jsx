// src/pages/BlogList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../sanityClient"; // tumhara Sanity client config

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{ title, slug, excerpt }`)
      .then(setBlogs)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Swift Learning Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <Link
            key={blog.slug.current}
            to={`/blog/${blog.slug.current}`}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
