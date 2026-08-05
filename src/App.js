import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponents/LoginPage";
import RegisterUser from "./Components/LoginComponents/RegisterUser";
import FarmerMenu from "./Components/LoginComponents/FarmerMenu";
import FarmEntry from "./Components/FarmCropComponent/FarmEntry";
import CropEntry from "./Components/FarmCropComponent/CropEntry";
import FarmList from "./Components/FarmCropComponent/FarmList";
import CropList from "./Components/FarmCropComponent/CropList";
import FarmCropReport from "./Components/FarmCropComponent/FarmCropReport";
import ExpenseEntry from "./Components/ExpenseComponent/ExpenseEntry";
import ExpenseList from "./Components/ExpenseComponent/ExpenseList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/farmer-menu" element={<FarmerMenu />} />
          <Route path="/farm-add" element={<FarmEntry />} />
          <Route path="/crop-add" element={<CropEntry />} />
          <Route path="/farm-list" element={<FarmList />} />
          <Route path="/crop-list" element={<CropList />} />
          <Route path="/farm-crop/:cid"element={<FarmCropReport/>}/>
          <Route path="/expense-entry" element={<ExpenseEntry />} />
          <Route path="/expense-list" element={<ExpenseList />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
