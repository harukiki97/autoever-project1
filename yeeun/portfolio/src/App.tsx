import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import AllProjects from "./pages/AllProjects/AllProjects";
import Blog from "./pages/Blog/Blog";
import GuestBook from "./pages/GuestBook/GuestBook";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import BlogDetail from "./pages/BlogDetail/BlogDetail";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/guestbook" element={<GuestBook />} />
      </Routes>
    </div>
  );
}

export default App;
