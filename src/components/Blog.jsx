import { useEffect, useState } from "react"
import { client } from "../lib/sanity"
import { PortableText } from "@portabletext/react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const query = `*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  content
}`

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    client.fetch(query).then(setPosts)
  }, [])

  return (
    <div className="text-left relative">
      <AnimatePresence mode="wait">
        {!selected ? (
          // Blog List
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-3xl font-bold mb-6">📚 Swift Learning Blog</h1>
            {posts.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ scale: 1.02 }}
                className="mb-8 pb-4 border-b cursor-pointer hover:bg-gray-50 p-4 rounded-lg"
                onClick={() => setSelected(post)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {post.content[0]?.children?.[0]?.text?.slice(0, 120)}...
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Blog Detail
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-bold mb-6">{selected.title}</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg text-gray-800 leading-relaxed"
            >
              <PortableText value={selected.content} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
