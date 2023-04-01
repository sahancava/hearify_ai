import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Test from './pages/Test.tsx';
import React from 'react';

function App() {
  return (
    <Router>
    <Routes>
        <Route exact path='/' exact element={<Test />} />
    </Routes>
    </Router>
  );
}

export default App;
