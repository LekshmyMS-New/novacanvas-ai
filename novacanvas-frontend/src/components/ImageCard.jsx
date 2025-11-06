import React from "react";
import { motion } from "framer-motion";

const ImageCard = ({ item }) => {
  return (
    <motion.div className="preview-card" whileHover={{ y: -6 }}>
      <div style={{ height: 180, overflow: "hidden", borderRadius: 10 }}>
        <img src={item.imageUrl} alt={item.prompt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{item.prompt}</div>
        <div style={{ color: "#777", fontSize: 12, marginTop: 6 }}>{new Date(item.createdAt).toLocaleString()}</div>
      </div>
    </motion.div>
  );
};

export default ImageCard;
