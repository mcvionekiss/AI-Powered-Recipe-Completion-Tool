import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import Fridge from './pages/Fridge';
import Kitchen from './pages/Kitchen';
import History from './pages/Histroy';
import About from './pages/About';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Dashboard />} />  

        {/* SignUp & LogIn Pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        {/* Functional Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fridge" element={<Fridge />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;