import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginComponents/LoginPage';
import RegisterUser from './Components/LoginComponents/RegisterUser';
import FarmerMenu from './Components/LoginComponents/FarmerMenu';
import FarmEntry from './Components/FarmCropComponent/FarmEntry';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/farmer-menu" element={<FarmerMenu />} />
          <Route path="/farm-add" element={<FarmEntry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
