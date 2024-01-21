import Counter from "./components/Counter";
import logo from "./assets/logo.svg";

import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const gameId = "836449"; // Remplacez ceci par l'ID du jeu que vous recherchez
  const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React !</p>

        <Counter />

        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
