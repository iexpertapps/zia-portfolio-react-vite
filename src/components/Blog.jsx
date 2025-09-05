import { useEffect, useState } from "react"
import { client } from "../lib/sanity"
import { Link } from "react-router-dom"

const query = `*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  content
}`

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    client.fetch(query).then(setPosts)
  }, [])

  return (
    <div className="text-left relative">
      <h1 className="text-3xl font-bold mb-6">📚 Swift Learning Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post.slug.current}`}
            className="block mb-8 pb-4 border-b hover:bg-gray-50 p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {post.content[0]?.children?.[0]?.text?.slice(0, 120)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
