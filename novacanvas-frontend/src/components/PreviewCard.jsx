import React from "react";
import { motion } from "framer-motion";

const PreviewCard = ({ imageUrl, prompt, onSave }) => {
  return (
    <motion.div
      className="preview-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
    >
      <div style={{ borderRadius: 12, overflow: "hidden", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", background: "#faf9ff" }}>
        {imageUrl ? (
          <img src={imageUrl} alt="preview" style={{ width: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ color: "#aaa" }}>No preview</div>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{prompt || "No prompt yet"}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewCard;
