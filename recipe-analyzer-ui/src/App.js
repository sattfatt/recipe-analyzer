import logo from './logo.svg';
import './App.css';
import RecipeInput from "./Components/RecipeInput";
import { useState } from 'react';
function App() {

  const [nutrientInfo, setNutrientInfo] = useState(null);
  const [toolInfo, setToolsInfo] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Analyzer</h1>
        <RecipeInput setNutrientInfo = {setNutrientInfo} setToolsInfo = {setToolsInfo}></RecipeInput>

        
      </header>
    </div>
  );
}

export default App;
