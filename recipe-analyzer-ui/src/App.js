import './App.css';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from "react-router-dom";
import { validate_session } from './Session/session';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { off, on } from './Utilities/Events';
import { useCookies } from 'react-cookie';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [landpage, setLandpage] = useState(<div></div>);

  const [cookies, setCookie] = useCookies(['token']);

  let navigate = useNavigate();

  const handleLogin = (e) => {
    setLandpage(<MainPage></MainPage>);
    setCookie('token', e.detail.token);
    navigate('/');
  }

  // check the session
  useEffect(() => {
    validate_session(cookies.token).then((valid) => {
      if (valid) {
        setIsLoggedIn(true);
        setLandpage(<MainPage></MainPage>)
      } else {
        setIsLoggedIn(false)
        navigate('/login')
      }
    });

    on('login', handleLogin);

    return () => {off('login', handleLogin)};
  }, [])



  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/*" element={landpage} />
        </Routes>
      </header>
    </div>
  );


}

export default App;
