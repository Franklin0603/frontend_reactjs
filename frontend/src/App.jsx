import React from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Chatbot from "./components/Chatbot/Chatbot"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Form from "./pages//Form/Form"
// import Report from "./pages/Report"
import Report from "./pages/Report2"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
      <Chatbot />
    </Router>
  )
}

export default App
