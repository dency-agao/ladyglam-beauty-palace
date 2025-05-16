import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/signup.css"; 
import "bootstrap/dist/css/bootstrap.min.css";


const Signup = () => {
  return (
    <div className="signup-container">
      <h2 className="text-center">Signup</h2>
      <form className="p-4 shadow rounded bg-white">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" placeholder="First Name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" placeholder="Last Name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
