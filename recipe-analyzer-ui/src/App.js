import './App.css';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/*" element={<MainPage></MainPage>} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
