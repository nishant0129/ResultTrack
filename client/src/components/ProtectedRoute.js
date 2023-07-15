


import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts.js";
import { SetEmployee } from "../redux/employees.js";
import DefaultLayout from "../components/DefaultLayout.js";
// import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
 // const navigate = useNavigate();
//   const [readyToRednder, setReadyToRednder] = React.useState(false);
  const dispatch = useDispatch();
  const geEmployeeData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      dispatch(HideLoading());
      const response = await axios.post(
        "/api/employees/get-employee-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(SetEmployee(response.data.data));
        // setReadyToRednder(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(HideLoading());
      toast.error("somethingg went wrong")
      //navigate("/login");
    }
  };

  useEffect(() => {
    geEmployeeData();
  }, []);

  return <DefaultLayout>{props.children}</DefaultLayout>;
}

export default ProtectedRoute;

