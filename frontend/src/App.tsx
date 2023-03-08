import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import Debt from './components/Debt';
import Landing from './components/Landing';

function App() {
  let [token, setToken] = useState(null)
  let [user, setUser] = useState(null)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#416d3e',
      },
    },
  });

  useEffect(() => {
    /**
     * keeps user logged in
     */
    let getToken = async () => {
      const data = window.localStorage.getItem('token')
  
      if(data !== null) {
        setToken(JSON.parse(data))
        await getUser(data)
      }
    }

    let getUser = async (temp: string) => {
      let response = await fetch(`http://127.0.0.1:8000/user`, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({ token: temp })
      })
  
      let data = await response.json()
      setUser(data)
    }

    let getTheme = () => {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")

      if (darkThemeMq.matches) {
        document.body.className = 'dark-theme'
      } else {
        document.body.className = 'light-theme'
      }
    }

    getToken()
    getTheme()
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='' element={<Landing />}></Route>
            <Route path='auth' element={<Auth setToken={setToken} setUser={setUser} />}></Route>
            <Route path='home' element={<Home user={user} />}></Route>
            <Route path='debt' element={<Debt />}></Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
