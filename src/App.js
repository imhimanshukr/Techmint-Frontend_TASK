import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserDetails from './pages/UserDetails/UserDetails';

const App = () => {
  return (
    <div className='container'>
    <Router>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
