import { Form, Input } from "antd";
import React from "react";
import { Link} from "react-router-dom";
import axios from "axios";

const onFinish = async(values) => {
    try {
        const response =await axios.post("/api/employees/login",values);
        if(response.data.success)
        {
            localStorage.setItem("token", response.data.data);
            alert(response.data.message);
        }
        else
        alert(response.data.message);

    } catch (error) {
        alert(error.message);
    }
}

function Login() {
  
  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen" >
      <Form layout="vertical w-400 white p-4"  onFinish={onFinish}>
        <h1 className="text-medium"><b>RESULT_TRACK</b></h1>
        <hr />
        <h1 className="text-medium">Employee - LOGIN</h1>
        <hr />
        <Form.Item name="employeeId" label="Employee ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        
        <button className="primary text-white px-5 my-2 w-100">LOGIN</button>
        <Link to="/register" className=" text-mini">
          Dont have a Account, Click Here To Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;