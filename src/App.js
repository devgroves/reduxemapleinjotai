import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";

function App() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="App">
      <Home />
      <button
        onClick={() => {
          setRefresh(refresh + 1);
        }}
      >
        refresh
      </button>
    </div>
  );
}

export default App;
