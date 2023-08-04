import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import t1 from "../assets/t1.jpg";
import t2 from "../assets/t2.jpg";
import t3 from "../assets/t3.png";
import t4 from "../assets/t4.jpg";
import t5 from "../assets/t5.png";
import t6 from "../assets/t6.png";
import t7 from "../assets/t7.jpg";
import t8 from "../assets/t8.jpg";
import v45 from "../assets/vegetables/tomato.jpg";
import s4 from "../assets/Snacks/s4.jpg";
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
import "./TodayOffer.css";
import { connect } from "react-redux";
import { addToCart, viewItem } from "../redux/action";
import { useFirestore } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";

function TodayOffer(props) {
  let firestore = useFirestore();
  const [myCart, setCart] = useState([]);

  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/shop/${name}`);
  };

  const handleBrand = (name) => {
    navigate(`/brand/${name}`);
  };
  const handleViewItem = async (item) => {
    await props.viewItem(item);
    navigate("/overview");
  };

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


  const product = [
    {
      id: 1,
      name: "Mustard Leaf ",
      oldprice: "40.00",
      newprice: "35.00",
      qty: "1 kG",
      discount: "13% off",
      img: [t1],
      nameH: "सरसों के साग",
      brand: "Matardana",
    },
    {
      id: 2,
      name: "Red Cabbage",
      oldprice: "300.00",
      newprice: "240.00",
      qty: "1 KG",
      discount: "20% off",
      img: [t2],
      nameH: "",
      brand: "Matardana",
    },
    {
      id: 3,
      name: "New Red Potato",
      oldprice: "70.00",
      newprice: "44.00",
      qty: "1 KG",
      discount: "37% off",
      img: [t3],
      nameH: "नया लाल आलू",
      brand: "Matardana",
    },
    {
      id: 4,
      name: "Britannia Nutri Choice Sugar Free Cracker Plain Biscuits",
      oldprice: "",
      newprice: "35.00",
      qty: "300 Gram",
      discount: "",
      img: [t4],
      nameH: "ब्रिटानिया न्यूट्री चॉइस शुगर फ्री क्रैकर प्लेन बिस्किट",
      brand: "Britannia",
    },
    {
      id: 5,
      name: "Orange",
      oldprice: "75.00",
      newprice: "48.00 ",
      qty: "1 KG",
      discount: "36% off",
      img: [t5],
      nameH: "संतरा",
      brand: "Matardana",
    },
    {
      id: 6,
      name: "Methi Patta/Saag",
      oldprice: "20.00",
      newprice: "14.00",
      qty: "250 Gram",
      discount: "30% off",
      img: [t8],
      nameH: "मेथी",
      brand: "Matardana",
    },
    {
      id: 7,
      name: "Spinach (Palak)",
      oldprice: "25.00",
      newprice: "18.00",
      qty: "500 Gram",
      discount: "28% off",
      img: [t6],
      nameH: "",
      brand: "Matardana",
    },
    {
      id: 8,
      name: "New Potato",
      oldprice: "65.00",
      newprice: "42.00",
      qty: "1 KG",
      discount: "35% off",
      img: [t7],
      nameH: "नया आलू",
      brand: "Matardana",
    },
    {
      id: 9,
      name: "Tomato",
      nameH: "टमाटर",
      brand: "Matardana",
      oldprice: "90.00",
      newprice: "80.00",
      qty: "1 KG",
      discount: "11% off",
      img: [v45],
    },
    {
      id: 10,
      name: "Sunfeast Dark Fantasy Choco Fills Filled Biscuits",
      nameH: "सनफीस्ट डार्क फैंटेसी चोको बिस्कुट",
      brand: "Sunfeast",
      oldprice: "",
      newprice: "120.00",
      qty: "300 Gram",
      discount: "",
      img: [s4],
    },
  ];

  const [qty, setQty] = useState(1);

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

  const isItemInCart = (item) => {
    return myCart.some((product) => product.name == item.name);
  };

  return (
    <div className="tSpecial-container">
      <div className="tSpecial-heading">Today's Offer</div>
      <p class="view-all" onClick={() => handleClick("Groceries")}>
        View All
      </p>

      <div className="today-special-lists">
        {product.map((item) => (
          <div key={item.id} className="tItem">
            <Card
              sx={{
                padding: "1rem 1rem",
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
                image={item.img[0]}
                onClick={() => handleViewItem(item)}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="success"
                  sx={{ fontSize: "0.75rem" }}
                >
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
                  onClick={() => handleViewItem(item)}
                  sx={{ fontSize: "0.75rem" }}
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
                  {item.oldprice != "" && (
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
                      // width:{xs:"6rem"}
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
                    <input value={qty} className="qty-input"></input>
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
                    onClick={() => handleCart(item)}
                    sx={{ boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}
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

export default connect(mapStateToProps, mapDispatchToProps)(TodayOffer);
