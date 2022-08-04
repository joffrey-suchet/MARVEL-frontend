import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./composants/Header";
import Characters from "./pages/characters";
import Comics from "./pages/comics";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </Router>
  );
}
export default App;
