import { EthProvider } from "./contexts/EthContext";
import LivretFamille from "./components/LivreFamille";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <LivretFamille />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
