import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFirestore } from "react-redux-firebase";
import "./PoojaSpecial.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, viewItem } from "../redux/action";
import * as poojaProduct from "./state";
import { getFirestore } from "redux-firestore";
import { Input, TextField, cardActionAreaClasses } from "@mui/material";

function PoojaSpecial(props) {
  // const [gram, setGram] = React.useState('');
  // const handleChange = (event) => {
  //   setGram(event.target.value);
  // };
  const [product, setProduct] = useState([]);
  const [display, setDisplay] = useState(false);
  const [myCart, setCart] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  let firestore = useFirestore();

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };

  useEffect(() => {
    let newArr = [];
    newArr = poojaProduct.Pooja.filter((item) => {
      return item.id > 15 && item.id < 21;
    });

    setProduct(newArr);
  }, [product]);

  const handleCart = async (item) => {
    await props.addToCart(item);
    let newData = [];
    if (props.auth.uid == null) {
      // navigate("/login");
      // return;

      let oldData = JSON.parse(localStorage.getItem("cart") || "[]");
      if (oldData != null) {
        const isPresentLocal = oldData.some(
          (product) => product.name == item.name
        );
       
        if (isPresentLocal) {
          newData = oldData.map((product) =>
            product.name == item.name
              ? {
                  ...product,
                  qtyy: Number(product.qtyy) + 1,
                  itemPrice: (product.qtyy + 1) * product.newprice,
                }
              : product
          );
        } else {
          newData = [...oldData, { ...item, qtyy: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(newData));
      } else {
        localStorage.setItem("cart", JSON.stringify({ ...item }));
      }
    }
     else {
      let user = await firestore.collection("users").doc(props.auth.uid).get();

      user = user.data();
      let saveObj = [];
      saveObj = user.saveItem.filter((product) => product.name !== item.name);

      // get data from localStorage and update firebase cart

      let obj = [];

      const isPresent = user.cart.some((product) => product.name === item.name);

      if (isPresent) {
        obj = user.cart.map((product) =>
          product.name == item.name
            ? {
                ...product,
                qtyy: Number(product.qtyy) + 1,
                itemPrice: (product.qtyy + 1) * product.newprice,
              }
            : product
        );
      } else {
        obj = [...user.cart, { ...item, qtyy: 1 }];
      }   

      await firestore.collection("users").doc(props.auth.uid).update({
        cart: obj,
        saveItem: saveObj,
      });
    }
  };


  const myfirestore = getFirestore();
  const getCartItem = () => {

    const unsub = myfirestore
      .collection("users")
      .doc(props.auth.uid)
      .onSnapshot((snapshot) => {
        setCart(snapshot.data().cart);
      });
    return () => {
      unsub();
    };
  };

  useEffect(() => {
    if (props.auth.uid) {

      getCartItem();
    }
    else{
      const cart=JSON.parse(localStorage.getItem("cart" || "[]"))
      if(cart!=null){
        setCart(cart)
      }
      else{
        setCart([])
      }
       
      
    }
  }, [props.auth.uid,myCart]);

  const handleViewItem = async (item) => {
    await props.viewItem(item);
    navigate("/overview");
  };

  const isItemInCart = (item) => {
    return myCart.some((product) => product.name == item.name);
  };

  

  return (
    <div className="pSpecial-container">
      <div className="pSpecial-heading">Puja Special</div>

      <div className="pooja-special-lists">
        {product.map((item) => (
          <div key={item.id} className="pItem">
            <Card
              sx={{
                padding: "0.5rem 1rem",
                boxShadow: "none",
                height: "auto",
                width: { md: "14.5rem", xs: "9.5rem" },
              
              }}
            >
              {item.discount && (
                <div className="tag">
                  <span class="dot"></span>
                  &nbsp; {item.discount}&nbsp;
                </div>
              )}

              <CardMedia
                component="img"
                alt={item.name}
                height="100%"
                onClick={() => handleViewItem(item)}
                image={item.img[0]}
              />
              <CardContent>
                <Typography variant="body2" color="success">
                  <LocalOfferIcon
                    color="success"
                    sx={{ fontSize: "1rem", paddingTop: "0.2rem" }}
                  ></LocalOfferIcon>
                  &nbsp;
                  <span
                    style={{
                      color: "green",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleBrand(item.brand)}
                  >
                    {item.brand}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontSize: "0.75rem" }}
                  onClick={() => handleViewItem(item)}
                >
                  {item.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: "100", fontSize: "0.75rem" }}
                >
                  {item.nameH}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
                >
                  {item.oldPrice != null && (
                    <span style={{ color: "gray" }}>
                      <CurrencyRupeeIcon
                        sx={{ fontSize: "0.65rem", fontWeight: "bold" }}
                      ></CurrencyRupeeIcon>
                      <s>{item.oldprice}</s>&nbsp;
                    </span>
                  )}
                  <CurrencyRupeeIcon
                    sx={{ fontSize: "0.65rem", fontWeight: "bold" }}
                  ></CurrencyRupeeIcon>
                  <span>{item.newprice}</span>
                </Typography>

                <FormControl fullWidth>
                  <Select
                    sx={{
                      borderRadius: "2rem",
                      height: "1.8rem",
                      fontSize: "0.65rem",
                      // width: { xs: "6rem" },
                    }}
                    value={item.qty}
                  >
                    <MenuItem value={item.qty}>{item.qty}</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>

              <CardActions
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isItemInCart(item) ? (
                  <div style={{ margin: "0", display: "flex" }}>
                    <button
                      style={{
                        border: "2px solid red",
                        width: "2rem",
                        height: "2rem",
                        background: "inherit",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                   
                    >
                      -
                    </button>
                    <input value={count} className="qty-input"></input>
                    <button
                      style={{
                        border: "2px solid green",
                        width: "2rem",
                        height: "2rem",
                        background: "inherit",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      // onClick={()=>setCount(count + 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <Button
                    size="small"
                    fullwidth
                    variant="contained"
                    color="success"
                    sx={{ boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}
                    onClick={() => handleCart(item)}
                  >
                    <span style={{ fontSize: "0.65rem" }}>ADD TO CART</span>
                    &nbsp;
                    <ShoppingCartIcon
                      sx={{ fontSize: "1rem" }}
                    ></ShoppingCartIcon>
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    viewItem: (item) => dispatch(viewItem(item)),
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoojaSpecial);
