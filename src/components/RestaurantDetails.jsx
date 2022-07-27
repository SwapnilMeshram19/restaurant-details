import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RestaurantDetails = () => {
  const [data, setData] = useState([]);

  //   console.log(Data)
  const getData = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/restaurant",
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div>
        {data.map((ele) => (
          <div key={ele.id}>
            <Card
              sx={{
                width: "35%",
                margin: "auto",
                marginTop: "20px",
              }}
            >
              <CardContent sx={{ display: "flex", gap: "10px" }}>
                <CardMedia
                  sx={{ width: 150 }}
                  component="img"
                  height="150"
                  image={ele.img}
                  alt="Restaurant Image"
                />

                <CardContent sx={{ width: 300, margin: "0px", padding: "0px" }}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{
                      fontWeight: "900",
                      color: "rgb(186,59,60)",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    {ele.name}
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ fontSize: "14px", textAlign: "left", color: "gray" }}
                  >
                    {ele.categories.join(", ")}
                  </Typography>

                  <Typography
                    component="div"
                    sx={{ fontSize: "14px", textAlign: "left", color: "gray" }}
                  >
                    Cost ₹{ele.cost_for_one} for one
                  </Typography>
                  <Typography
                    component="div"
                    sx={{ fontSize: "14px", textAlign: "left", color: "gray" }}
                  >
                    Accepts{" "}
                    {ele.payment_methods.upi || ele.payment_methods.card ? (
                      <span>online</span>
                    ) : ele.payment_methods.cash ? (
                      <span>cash</span>
                    ) : (
                      <span></span>
                    )}{" "}
                    payment only
                  </Typography>
                </CardContent>
                <CardContent sx={{ width: 150 }}>
                  <Typography
                    component="div"
                    sx={{
                      backgroundColor: "rgb(114,160,43)",
                      width: "40px",
                      height: "25px",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "white",
                      borderRadius: "5px",
                      marginLeft: "25px",
                      float: "right",
                    }}
                  >
                    {ele.rating}
                  </Typography>
                  <div style={{ float: "right" }}>
                    <Typography
                      component="div"
                      sx={{
                        fontSize: "14px",
                        textAlign: "right",
                        color: "gray",
                      }}
                    >
                      {ele.total_votes} Votes
                    </Typography>
                    <Typography
                      component="div"
                      sx={{
                        fontSize: "14px",
                        textAlign: "right",
                        color: "gray",
                      }}
                    >
                      {ele.reviews} Review
                    </Typography>
                  </div>
                </CardContent>
              </CardContent>
              <CardActions sx={{ float: "right" }}>
                <Button
                  variant="contained"
                  endIcon={<ChevronRightIcon />}
                  sx={{
                    color: "rgb(96,160,94)",
                    backgroundColor: "rgb(233,244,236)",

                    "&:hover":{
                        backgroundColor:"#b2c9b8"
                    }
                  }}
                >
                  Order Online
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
