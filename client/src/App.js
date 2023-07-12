
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/employees/login";
import Register from "./pages/employees/register";
import "./style/theme.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
