import { motion } from "framer-motion";

export default function PostList({ posts }) {
  return (
    <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 h-[350px] flex flex-col">
      <h2 className="mb-4 text-lg font-semibold">Recent Posts</h2>
      <div className="space-y-3 overflow-y-auto pr-2">
        {posts.slice(0, 20).map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 bg-neutral-800 rounded-lg"
          >
            <p className="font-medium text-sm">{post.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
