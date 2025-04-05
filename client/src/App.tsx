import { BrowserRouter, Route, Routes } from "react-router";
import { Landing } from "./components/pages/Landing";
import { Recepies } from "./components/pages/Recepies";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recepies" element={<Recepies />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
