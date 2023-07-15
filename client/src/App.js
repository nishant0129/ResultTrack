
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/employees/login";
import Register from "./pages/employees/register";
import "./style/theme.css";
import "./style/layout.css";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import{ Toaster} from 'react-hot-toast'
import EmployeeHome from "./pages/employees/EmployeeHome";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {

    const { loading } = useSelector((state) => state.alert);
   
    
  return (
    <div className="App">
     {loading ? <Spinner /> : null}
     <Toaster/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/employee" element={ <ProtectedRoute> <EmployeeHome /> </ProtectedRoute>}/>
        </Routes> 
      </BrowserRouter>
       
    </div>
  );
}

export default App;
