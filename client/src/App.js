
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
import Students from "./pages/employees/Students";
import AddStudent from "./pages/employees/AddStudent.js";
import EditStudent from "./pages/employees/EditStudent";
import PublicRoute from "./components/PublicRoute";

function App() {

    const { loading } = useSelector((state) => state.alert);
   
    
  return (
    <div className="App">
     {loading ? <Spinner /> : null}
     <Toaster/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
            <Route path="/register"element={<PublicRoute><Register /></PublicRoute> }/>
            <Route path="/employee" element={<ProtectedRoute> <EmployeeHome /> </ProtectedRoute>}/>
            <Route path="/employee/students" element= {<ProtectedRoute> <Students /> </ProtectedRoute>}/>
            <Route path="/employee/students/add" element={<ProtectedRoute> <AddStudent /> </ProtectedRoute>}/>
            <Route path="/employee/students/edit/:rollNo" element={<ProtectedRoute><EditStudent />
            </ProtectedRoute> }/>
            
        </Routes> 
      </BrowserRouter>
       
    </div>
  );
}

export default App;
