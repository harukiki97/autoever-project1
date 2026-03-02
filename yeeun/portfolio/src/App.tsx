import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
