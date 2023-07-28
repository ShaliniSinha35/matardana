import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import banner from "../assets/bannerImage.jpeg";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import "./Banner.css";
import Button from '@mui/material/Button';
export default function Banner() {

    const theme = createTheme();

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    };



    return (
        <>
            <div className='banner-cont' >
                <img src={banner} style={{width:"100%",height:"55%"}}  alt=""></img>

               {/* <Card variant="none" sx={{ position: "relative", background: "", height: "80vh",height:{sm:"60vh",md:"80vh",xs:"34vh"} }} >

                    <CardMedia
                        component="img"
                         sx={{opacity:"0.878"}}
                        image={banner}
                        alt="Banner"
                        

                    /> */}
{/* 
                    <CardContent>
                        <ThemeProvider theme={theme}>
                            <Typography classname="banner-text" sx={{ position: "absolute", top: "10%", width: "100%" ,  fontFamily:" Stencil Std, fantasy" }} variant="h3" component="div" color="gray">
                                Buy All Season Fresh Fruits and Vegetables
                            </Typography>
                        </ThemeProvider>
                        <CardActions sx={{ width: "100%", background: "", display: "flex", justifyContent: "center", position: "absolute",top:{sm:"9.5rem",md:"12rem",xs:"5rem"} }}>
                            <Button sx={{ borderRadius: "2rem", width: { md: "12rem", sm: "9rem" }, height:{md:"3rem",xs:"2rem"} , background: "#ffdd59", color: "Black", fontFamily: "Courier, monospace" }} variant="contained" classname="order-btn"><h3>Order Now</h3></Button>
                        </CardActions>
                    </CardContent> */}

                {/* </Card>  */}


                <div className='slider-text'>
                <marquee width="60%" direction="left">
                    <h4>
                        What Would You Want To Get.....&nbsp; For any enquiry&nbsp;Please Contact&nbsp;
                        <a href="tel:9155492401" style={{ textDecoration: "none" }}>
                            <span style={{ color: "#efff00" }}> &nbsp;9155492401</span>
                        </a>
                    </h4>
                </marquee>
            </div>

            </div>
           
        </>

    );
}