import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router-dom"
import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from './assignments/Assignment_2.jsx';
import Assignment_3 from './assignments/Assignment_3.jsx';
import Assignment_4 from './assignments/Assignment_4.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/ASG-01" element={<Assignment_1 />} />
      <Route path="/ASG-02" element={<Assignment_2 />} />
      <Route path="/ASG-03" element={<Assignment_3 />} />
      <Route path="/ASG-04" element={<Assignment_4 />} />
    </Routes>
  </HashRouter>
)
