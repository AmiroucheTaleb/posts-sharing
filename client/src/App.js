import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollTopWidget from "./components/ScrollTopWidget";
import ScrollRestore from "./components/ScrollRestore";
import { motion } from "framer-motion";
import axios from "./api/axios.js";
// import { posts } from './data/posts';
import { useQuery } from "@tanstack/react-query";
import Homepage from "./pages/Homepage";
import PostView from "./pages/PostView";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import About from "./pages/About";
import ProjectView from "./pages/ProjectView";

export default function App() {
  const { data: posts, isLoading } = useQuery(["posts"], async () => {
    const response = await axios.get("/postes");
    return response.data;
  });

  return isLoading ? (
    <h1>loading</h1>
  ) : (
    <div className='min-h-screen w-full pt-36'>
      <ScrollTopWidget />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Router>
          <ScrollRestore />
          <Navbar />
          <main>
            <Routes>
              <Route path='/' element={<Homepage posts={posts} />} />
              <Route path='/projects' element={<Projects posts={posts} />} />
              <Route path='/about' element={<About posts={posts} />} />
              <Route path='/post/view/:slug' element={<PostView />} />
              <Route path='/project/view/:slug' element={<ProjectView />} />
            </Routes>
          </main>
        </Router>
      </motion.div>
      <Footer />
    </div>
  );
}
