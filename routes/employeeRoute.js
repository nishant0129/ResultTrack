const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  try {
    const alreadyRegistered = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    if (alreadyRegistered) {
      return res.status(200).send({
        message: "User already registered",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newEmployee = new Employee(req.body);
    await newEmployee.save();

    res.status(200).send({
      message: "Employee Registered Successfully, Please wait for admin approval",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/login",async (req,res) => {
    try {
        const employee = await Employee.findOne({employeeId: req.body.employeeId});
        if(!employee) {
            return res.status(200).send({
                message: "User doesn't exist, Please register first",
                success: false
            })
        }
        const is_match  = await bcrypt.compare(req.body.password,employee.password);
        if(is_match) {
            if(!employee.approved) {
                return res.status(200).send( {
                    message: 'Please Wait for admin approval',
                    success : false
                });
            }
            const token = jwt.sign({_id: employee._id},process.env.SECRET_TOKEN,{expiresIn: "1day"})
            return res.status(200).send( {
                message : 'Employee logged in successfully. Redirecting to home page',
                success : true,
                data : token
            });
        }else {
            return res.status(200).send( {
                message : 'Invalid credentials ! Try again',
                success : false
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message,
            success: false
        });
    }
})

module.exports = router;
