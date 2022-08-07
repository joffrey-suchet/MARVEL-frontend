import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import fond from "./images/fond-de-page.jpg";

import Header from "./composants/Header";
import Characters from "./pages/characters";
import Comics from "./pages/comics";
import Character from "./pages/character";
function App() {
  return (
    <Router>
      <Header />
      {/* <img className="fond" src={fond} alt="fond de page" /> */}
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character/:characterId" element={<Character />} />
      </Routes>
    </Router>
  );
}
export default App;
