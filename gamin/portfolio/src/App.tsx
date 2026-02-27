import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import GuestBook from "./pages/GuestBook/GuestBook";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/BlogDetail/BlogDetail";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/guestbook" element={<GuestBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
