import About from "../../components/About/About";
import Experience from "../../components/Experience/Experience";
import Skills from "../../components/Skills/Skills";
import TopBlogs from "../../components/TopBlogs/TopBlogs";
import TopProjects from "../../components/TopProjects/TopProjects";

function Home() {
  return (
    <div>
      <About />
      <Skills />
      <Experience />
      <TopProjects />
      <TopBlogs />
    </div>
  );
}

export default Home;
