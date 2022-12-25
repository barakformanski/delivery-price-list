import "./App.css";

import Header from "./components/header/Header";
import RoutesStructure from "./components/Routes";

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <Header />
      </div>

      <div className="screens-container">
        <RoutesStructure />
      </div>
    </div>
  );
}

export default App;
