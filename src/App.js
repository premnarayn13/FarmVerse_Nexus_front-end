import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginComponents/LoginPage';
import RegisterUser from './Components/LoginComponents/RegisterUser';
import FarmerMenu from './Components/LoginComponents/FarmerMenu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/farmer-menu" element={<FarmerMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
