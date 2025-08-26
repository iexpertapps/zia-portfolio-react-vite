import { useEffect, useState } from "react"
import { client } from "../lib/sanity"
import { PortableText } from "@portabletext/react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowUp } from "lucide-react"

const query = `*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  slug,
  content
}`

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [selected, setSelected] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    client.fetch(query).then(setPosts)
  }, [])

  useEffect(() => {
    if (selected) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [selected])

  // Show scroll-to-top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

            {/* Scroll-to-Top Button (List View Only) */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="fixed bottom-6 right-6 p-4 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 z-50"
                >
                  <ArrowUp className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Blog Detail
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-6">{selected.title}</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg text-gray-800 leading-relaxed"
            >
              <PortableText value={selected.content} />
            </motion.div>

            {/* Floating Back Button */}
            <motion.button
              onClick={() => setSelected(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 z-50"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

