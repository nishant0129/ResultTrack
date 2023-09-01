import { Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateName = (_, value) => {
    if (!value) {
      return Promise.reject();
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      return Promise.reject("Name must contain only letters");
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject();
    } else if (value.length < 7) {
      return Promise.reject("Password must be at least 7 characters long");
    } else if (!/(?=.*\d)(?=.*[A-Z])/.test(value)) {
      return Promise.reject(
        "Password must have at least one digit and one capital letter"
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/employee/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
      <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
        <h1 className="text-medium">
          <b>RESULTS_TRACK</b>
        </h1>
        <hr />
        <h1 className="text-medium">Employee - Registration</h1>
        <hr />
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            {
              validator: validateName,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employeeId"
          label="Employee ID"
          rules={[
            {
              required: true,
              message: "Please enter your Employee ID",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
              },
            }),
          ]}
          dependencies={["password"]}
        >
          <Input.Password />
        </Form.Item>

        <button className="primary text-white px-5 my-2 w-100">REGISTER</button>
        <Link to="/login" className=" text-mini">
          Already Registered , Click Here To Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;

// import { Form, Input } from "antd";
// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { HideLoading, ShowLoading } from "../../redux/alerts";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";

// function Register() {
//     const dispatch = useDispatch();

//     const onFinish = async (values) => {
//         try {
//             dispatch(ShowLoading());
//           const response = await axios.post("/api/employees/register", values);
//           dispatch(HideLoading());
//           if (response.data.success) {
//             toast.success(response.data.message);
//           } else toast.error(response.data.message);
//         } catch (error) {
//             dispatch(HideLoading());
//             toast.error(error.message);
//         }
//       };

//   return (
//     <div className="primary d-flex align-items-center justify-content-center h-screen">
//       <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
//         <h1 className="text-medium">
//           <b>RESULT_TRACK</b>
//         </h1>
//         <hr />
//         <h1 className="text-medium">Employee - Registration</h1>
//         <hr />
//         <Form.Item name="name" label="Name">
//           <Input />
//         </Form.Item>
//         <Form.Item name="employeeId" label="Employee ID">
//           <Input />
//         </Form.Item>
//         <Form.Item name="password" label="Password">
//           <Input type="password" />
//         </Form.Item>
//         <Form.Item name="confirmPassword" label="Confirm Password">
//           <Input type="password" />
//         </Form.Item>
//         <button className="primary text-white px-5 my-2 w-100">REGISTER</button>
//         <Link to="/login" className=" text-mini">
//           Already Registered , Click Here To Login
//         </Link>
//       </Form>
//     </div>
//   );
// }

// export default Register;
