import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
const AddNew = () => {
  const [categoriesChecked, setCategoriesChecked] = useState([]);
  const [paymentChecked, setPaymentChecked] = useState({
    card: false,
    cash: false,
    upi: false,
  });
  const [state, setState] = React.useState({
    name: "",
    img: "",
    cost_for_one: "",
    cost_for_two: "",
    total_votes: "",
    reviews: "",
    rating: 0,
    categories: [],
    payment_methods: {
      card: false,
      cash: false,
      upi: false,
    },
  });

  //   const handleCategoriesChecked = (event) => {
  //     const { name, checked } = event.target;
  //     let categoriesChecked_array = [...categoriesChecked];
  //     if (checked) {
  //       categoriesChecked_array = [...categoriesChecked, name];
  //     } else {
  //       categoriesChecked_array.splice(categoriesChecked.indexOf(name), 1);
  //     }
  //     setCategoriesChecked(categoriesChecked_array);
  //   };
  // console.log(state);
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "payment") {
      setPaymentChecked({
        ...paymentChecked,
        [event.target.value]: event.target.checked,
      });
      setState({
        ...state,
        payment_methods: {
          ...paymentChecked,
          [event.target.value]: event.target.checked,
        },
      });
    } else if (name === "categories") {
      let categoriesChecked_array = [...categoriesChecked];
      if (event.target.checked) {
        categoriesChecked_array = [...categoriesChecked, event.target.value];
        setState({
          ...state,
          categories: categoriesChecked_array,
        });
      } else {
        categoriesChecked_array.splice(categoriesChecked.indexOf(name), 1);
        setState({
          ...state,
          categories: categoriesChecked_array,
        });
      }
      setCategoriesChecked(categoriesChecked_array);
    } else {
      setState({
        ...state,
        [event.target.name]: value,
      });
    }
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/restaurant",
      data: state,
    })
      .catch((error) => {
        console.log(error.response.data);
      });

    setState({
      name: "",
      img: "",
      cost_for_one: "",
      cost_for_two: "",
      total_votes: "",
      reviews: "",
      rating: 0,
      categories: [],
      payment_methods: {
        card: false,
        cash: false,
        upi: false,
      },
    });
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          width: "500px",
          border: "1px solid gray",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <Typography
          component="legend"
          sx={{
            fontSize: "22px",
            margin: "10px",
            textDecoration: "underline",
            fontWeight: "800",
            color: "blue",
          }}
        >
          Restaurant Details
        </Typography>
        <TextField
          sx={{ width: "80%", margin: "10px" }}
          id="outlined-basic"
          label="Restaurant Name"
          variant="outlined"
          onChange={handleChange}
          name="name"
          size="small"
          value={state.name}
        />
        <br />
        <TextField
          sx={{ width: "80%", margin: "10px" }}
          id="outlined-basic"
          label="Image Link"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="img"
          value={state.img}
        />
        <br />
        <Box
          sx={{
            width: "70%",
            border: "1px solid gray",
            margin: "auto",
            marginTop: "15px",
            display: "flex",
            gap: "20%",
            padding: "15px",
          }}
        >
          {/* Categories */}
          <FormControl>
            <FormLabel component="legend">Categories</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categories"
                    value="Asian"
                  />
                }
                label="Asian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categories"
                    value="Italian"
                  />
                }
                label="Italian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categories"
                    value="North Indian"
                  />
                }
                label="North Indian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categories"
                    value="Chinease"
                  />
                }
                label="Chinease"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categories"
                    value="Continental"
                  />
                }
                label="Continental"
              />
            </FormGroup>
          </FormControl>
          {/* Payment Methods */}
          <FormControl>
            <FormLabel component="legend">Payment Methods</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="payment"
                    value="card"
                  />
                }
                label="Card"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="payment"
                    value="cash"
                  />
                }
                label="Cash"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="payment"
                    value="upi"
                  />
                }
                label="Upi"
              />
            </FormGroup>
          </FormControl>
        </Box>

        <TextField
          type="number"
          id="outlined-start-adornment"
          name="cost_for_one"
          size="small"
          sx={{ width: "40%", margin: "20px" }}
          value={state.cost_for_one}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          label="Cost For One"
        />

        <TextField
          type="number"
          id="outlined-start-adornment"
          name="cost_for_two"
          size="small"
          sx={{ width: "40%", margin: "20px" }}
          value={state.cost_for_two}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          label="Cost For Two"
        />
        <br />
        <TextField
          type="number"
          id="outlined"
          name="total_votes"
          size="small"
          sx={{ width: "40%", margin: "20px" }}
          value={state.total_votes}
          onChange={handleChange}
          label="Total Votes"
        />
        <br />

        <TextField
          type="number"
          id="outlined"
          name="reviews"
          size="small"
          sx={{ width: "40%", margin: "20px" }}
          value={state.reviews}
          onChange={handleChange}
          label="Reviews"
        />
        <br />
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          defaultValue={0}
          precision={0.5}
          value={parseInt(state.rating)}
          onChange={handleChange}
        />
        <br />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: "20px" }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AddNew;
