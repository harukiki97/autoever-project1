import About from "../../components/About/About";
import Contacts from "../../components/Contacts/Contacts";
import Experience from "../../components/Experience/Experience";
import FeaturedBlogs from "../../components/FeaturedBlogs/FeaturedBlogs";
import FeaturedProjects from "../../components/FeaturedProjects/FeaturedProjects";
import Skills from "../../components/Skills/Skills";

function Home() {
  return (
    <div>
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <FeaturedBlogs />
      <Contacts />
    </div>
  );
}

export default Home;
