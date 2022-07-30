import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalProvider } from "./Context/GlobalContext";

import Header from './Components/Header';
import Main from "./Pages/Main";
import Cart from './Pages/Cart';
import Footer from './Components/Footer';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: indigo,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalProvider>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Header />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
            <Footer />
          </div>
        </GlobalProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
