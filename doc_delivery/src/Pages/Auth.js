import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import axios from "axios";

import authContext from "../Contexts";

const Signin = () => {
  const { authenticated, setAuthenticated } = useContext(authContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    console.log("clicked");
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:5000/login",
          {
            username,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            navigate("/courier");
            setAuthenticated(1);
          } else if (res.status === 201) {
            setAuthenticated(2);
            navigate("/psc");
          } else if (res.status === 202) {
            setAuthenticated(3);
          }
        });
    } catch (error) {
      console.log(error);
      setAuthenticated(99);
    }
  };

  return (
    <div>
      <form onSubmit={login}>
        <Box
          margin="auto"
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          marginTop={10}
          borderRadius={10}
          padding={3}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{}}
        >
          <Typography variant="h4" padding={3} text-align="center">
            Sign in
          </Typography>

          <TextField
            error={authenticated == 99 ? true : false}
            margin="normal"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={authenticated == 99 ? "Not valid" : "Username"}
          />
          <TextField
            error={authenticated == 99 ? true : false}
            margin="normal"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btn-sign">
            <Button type="submit" endIcon={<LoginIcon />}>
              Login
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Signin;
