// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../lib/sanity";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{ title, body }`,
        { slug }
      )
      .then(setBlog)
      .catch(console.error);
  }, [slug]);

  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <article className="max-w-3xl mx-auto p-6 prose lg:prose-xl">
      <h1>{blog.title}</h1>
      <div>{blog.body}</div>
    </article>
  );
}
