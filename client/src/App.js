
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/employees/login";
import Register from "./pages/employees/register";
import "./style/theme.css";
import "./style/layout.css";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import{ Toaster} from 'react-hot-toast'
function App() {

    const { loading } = useSelector((state) => state.alert);
   
  return (
    <div className="App">
     {loading ? <Spinner /> : null}
     <Toaster/>
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
