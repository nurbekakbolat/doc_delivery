import { React, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  ListItemText,
  ListItem,
  List,
  Divider,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import qs from "qs";
import Button from "@mui/material/Button";
import clientInfo from "./ClientInfo.json";
function Courier(props) {
  const [info, setInfo] = useState({
    iin: "",
    lastName: "",
    firstName: "",
  });
  const [item, setItem] = useState("");
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const location = useLocation();
  const iin = [
    "860904350504",
    "930823300880",
    "900319450997",
    "950905451464",
    "000430000049",
    "921123351335",
    "960217351422",
    "860729351086",
    "830730300232",
  ];
  const getToken = async () => {
    const url =
      "http://hakaton-idp.gov4c.kz/auth/realms/con-web/protocol/openid-connect/token";
    const data = qs.stringify({
      username: "test-operator",
      password: "DjrsmA9RMXRl",
      client_id: "cw-queue-service",
      grant_type: "password",
    });

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getClient = async () => {
    var it = iin[Math.floor(Math.random() * iin.length)];
    console.log(it);
    setItem(it);
    const url = "http://hakaton-fl.gov4c.kz/api/persons/" + it + "/";

    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios(config)
      .then((response) => {
        setInfo(response.data);
        setAddress(response.data.regAddress.address);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const { submittedValue } = location.state || {};
  console.log(submittedValue);
  useEffect(() => {
    // getToken();
    // getClient();
  }, []);
  return (
    <Paper>
      <Grid sx={{ margin: "10px", padding: "10px" }} container spacing={1}>
        <Grid item xs={6}>
          <Typography>ИИН</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.iin}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>Имя</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.firstName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Фамилия</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.lastName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Адрес доставки</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.regAddress.address}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Button
            onClick={() => {
              getClient();
            }}
            color="error"
            variant="outlined"
          >
            Отказаться
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={() => {
              getClient();
            }}
            color="success"
            variant="contained"
          >
            Принять заказ
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={() => {
              getClient();
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Courier;
