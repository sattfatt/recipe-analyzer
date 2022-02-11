import logo from './logo.svg';
import './App.css';
import RecipeInput from "./Components/RecipeInput";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Analyzer</h1>
        <RecipeInput></RecipeInput>
      </header>
    </div>
  );
}

export default App;
