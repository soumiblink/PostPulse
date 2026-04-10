function PostCard({ post }) {
  return (
    <div style={{
      background: "white",
      padding: "16px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginBottom: "10px" }}>{post.title}</h3>
      <p style={{ color: "#555" }}>{post.body}</p>
    </div>
  );
}

export default PostCard;