import { useEffect, useState } from "react"
import { client } from "../lib/sanity"
import { PortableText } from "@portabletext/react"

const query = `*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  body
}`

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    client.fetch(query).then((data) => setPosts(data))
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Swift Learning Series</h1>

      {posts.map((post) => (
        <article key={post._id} className="mb-10 border-b pb-6">
          <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
          <div className="prose prose-lg text-gray-800">
            <PortableText value={post.body} />
          </div>
        </article>
      ))}
    </div>
  )
}
