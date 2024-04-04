import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot/Chatbot';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/form' component={Form} />
          <Route path='/report' component={Report} />
        </Switch>
      </div>
      <Chatbot />
    </Router>
  );
}


export default App;
