import './App.css';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from "react-router-dom";
import { validate_session } from './Session/session';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { off, on } from './Utilities/Events';
import { useCookies } from 'react-cookie';
import RegisterPage from './Pages/RegisterPage';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [landpage, setLandpage] = useState(<div></div>);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'email', 'name']);

  let navigate = useNavigate();

  const mainPage = <MainPage></MainPage>;

  const handleLogin = (e) => {
    setLandpage(mainPage);
    setCookie('token', e.detail.token);
    setCookie('email', e.detail.email);
    setCookie('name', e.detail.name);
    navigate('/', {replace: true});
    setIsLoggedIn(true);
  }

  // check the session
  useEffect(() => {
    validate_session(cookies.token).then((valid) => {
      if (valid) {
        setIsLoggedIn(true);
        setLandpage(mainPage)
      } else {
        setIsLoggedIn(false)
        navigate('/login', {replace: true})
      }
    });

    on('login', handleLogin);

    return () => {off('login', handleLogin)};
  }, [])

  return (
    <div className="App" key={document.location.href}>
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/*" element={landpage} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
