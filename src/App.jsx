import React from "react";
import Portfolio from "./components/Portfolio.jsx";
import Blog from "./components/Blog";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Portfolio Section */}
      <Portfolio />

      {/* Blog Section */}
     <Blog />
    </div>
  );
}
