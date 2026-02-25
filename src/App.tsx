import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Guestbook from './pages/Blog/Guestbook';
// import Guestbook from './pages/Blog/GuestBook';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">홈(프로젝트)</Link> | 
          <Link to="/guestbook"> 방명록</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

console.log("주소 연결 확인:", import.meta.env.VITE_SUPABASE_URL);