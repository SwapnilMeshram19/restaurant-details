import {
  Button,
  FormControl,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/system";
import { RestaurantCard } from "./RestaurantCard";

const RestaurantDetails = () => {
  const [data, setData] = useState([]);
  const [ratingValue, setRatingValue] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [sortByPrice, setSortByPrice] = useState("high");
  const [page, setPage] = useState(1);

  //   console.log(Data)
  const getData = () => {

    if (sortByPrice == "Sort") {
      axios({
        method: "get",
        url: `http://localhost:8080/restaurant?_page=${page}`,
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }else{
      axios({
        method: "get",
        url: `http://localhost:8080/restaurant?_page=${page}&_sort=cost_for_two&_order=${sortByPrice=="high"?"asc":sortByPrice=="low"?"desc":"asc"}`,
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }


    if(paymentMethod=="card"){
      axios({
        method: "get",
        url: `http://localhost:8080/restaurant?_page=${page}&_sort=&_order=asc}`,
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));

    }
    
  };

  useEffect(() => {
    getData();
    filterByPaymentMethod();
    filterByRating();
  }, [page,sortByPrice,paymentMethod,ratingValue]);


  const filterByPaymentMethod = ()=>{
    if(paymentMethod=="card"){
      setData(data.filter((el)=>{
        return el.payment_methods.card==true;
      }))
    }else if(paymentMethod=='cash'){
      setData(data.filter((el)=>{
        return el.payment_methods.cash==true;
      }))
    }else if(paymentMethod=="upi"){
      setData(data.filter((el)=>{
        return el.payment_methods.upi==true;
      }))
    }else{
      setData(data.filter((el)=>{
        getData();
      }))
    }
  }

  const filterByRating=()=>{
    console.log(ratingValue)
    setData(data.filter((el)=>{
      return parseInt(el.rating) === parseInt(ratingValue);
    }))
  };
  return (
    <div>
      <h1 style={{ color: "blue", textDecoration: "underline" }}>
        Restaurants
      </h1>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Sort By Rating</Typography>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event) => {
              setRatingValue(parseInt(event.target.value));
            }}
          />
        </Box>
        <Box>
          <FormControl sx={{ size: "small" }}>
            <Typography component="legend">Sort By Payment Types</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              sx={{ width: "100%", size: "small" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="upi">Upi</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ size: "small" }}>
            <Typography component="legend">Sort By Price for two</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortByPrice}
              onChange={(event) => setSortByPrice(event.target.value)}
              sx={{ width: "100%", size: "small" }}
            >
              <MenuItem value="high">Low to High</MenuItem>
              <MenuItem value="low">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <div>
        {data.map((ele) => (
          <RestaurantCard key={ele.id} data={ele} />
        ))}
      </div>
      <div className="page-button">
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((prevState) => prevState - 1)}
        >
          Prev
        </Button>
        <Button variant="outlined">{page}</Button>
        <Button
          variant="contained"
          onClick={() => setPage((prevState) => prevState + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RestaurantDetails;
