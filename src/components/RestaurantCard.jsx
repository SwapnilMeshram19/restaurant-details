import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    MenuItem,
    Rating,
    Select,
    Typography,
  } from "@mui/material";

  import ChevronRightIcon from "@mui/icons-material/ChevronRight";
  import { Box } from "@mui/system";

export const RestaurantCard=({data})=>{
    // console.log(data)
    return(
        <div> <Card
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
            image={data.img}
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
              {data.name}
            </Typography>
            <Typography
              component="div"
              sx={{ fontSize: "14px", textAlign: "left", color: "gray" }}
            >
              {data.categories.join(", ")}
            </Typography>

            <Typography
              component="div"
              sx={{ fontSize: "14px", textAlign: "left", color: "gray" }}
            >
              Cost ₹{data.cost_for_one} for one
            </Typography>
            <Typography
              component="div"
              sx={{ fontSize: "14px", textAlign: "left", color: "gray" }}
            >
              Accepts{" "}
              {data.payment_methods.upi || data.payment_methods.card ? (
                <span>online</span>
              ) : data.payment_methods.cash ? (
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
              {data.rating}
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
                {data.total_votes} Votes
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontSize: "14px",
                  textAlign: "right",
                  color: "gray",
                }}
              >
                {data.reviews} Review
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
      </Card></div>
    )
}
