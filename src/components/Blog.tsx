import { useEffect, useState } from "react"
import { client } from "../lib/sanity"
import { PortableText } from "@portabletext/react"

const query = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  content
}`

type Post = {
  _id: string
  title: string
  slug: any
  content: any
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    client.fetch(query).then((data) => setPosts(data))
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Swift Learning Series</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No posts found. Please add content in Sanity.</p>
      )}

      {posts.map((post) => (
        <article key={post._id} className="mb-10 border-b pb-6">
          <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
          <div className="prose prose-lg text-gray-800">
            <PortableText value={post.content} />
          </div>
        </article>
      ))}
    </div>
  )
}
