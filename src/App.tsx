
import Dashboard from "./components/Tables"
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Charts from "./components/Charts";
import Tables from "./components/Tables";
import Sidebar from "./components/Sidebar";

function App() {

  return (
    <Router>
      <div className="flex">
        <Sidebar/>
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tables" element={<Tables/>} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
