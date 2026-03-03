import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Footer from "./components/Footer/Footer";
import GuestBook from "./pages/GuestBook/GuestBook";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/guestbook" element={<GuestBook />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
