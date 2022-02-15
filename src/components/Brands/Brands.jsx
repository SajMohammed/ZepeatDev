import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import './brands.css';
import Levis from "../../assets/levis.svg";
import Handm from "../../assets/handm.svg";
import Hymart from "../../assets/hymart.svg";
import Zara from "../../assets/zara.svg";
import Uniqlo from "../../assets/uniqlo.svg";
import Timberland from "../../assets/timberland.svg";
import Brand from "./Brand";
import motLayout from '../../assets/motLayout.svg';
import { Link } from "react-router-dom";

const items = [
    {id: 1, image:Levis},
    {id: 2, image:Handm},
    {id: 3, image:Zara},
    {id: 4, image:Hymart},
    {id: 5, image:Uniqlo},
    {id: 6, image:Timberland},
    
]

const Brands = () => {

    const [brand, setBrand] = useState(true);
    const [layout, setLayout] = useState(false);

    const toggleBrand = () => {
        setBrand(true)
        setLayout(false)
            
    }
    const toggleLayout = () => {
        setLayout(true)
        setBrand(false)

        // if (layout)
        //     setLayout(true)
        // else
        //     setBrand(false)
    }

    return (
        <div style={{ margin: "24px 26px" }}>
        <div className="brands__container-title" style={{ marginBottom:"32px"}}>
            
            <h2 style={{color:'#20CE88', cursor:'pointer'}} onClick={toggleBrand}>Brands</h2>
            <h2 style={{color:'#20CE88', cursor:'pointer'}} onClick={toggleLayout}>Layout</h2>
        
        </div>
        {/* { brand && 
            <Grid container spacing={2}> 
                {items.map((item) => (
                    <Grid item key={item.id} xs={6}>
                        <Brand image={item.image} />
                    </Grid>
                ))}
            </Grid>
        }
        { layout && 
            <h2>Layout</h2>

        } */}
        { brand ?  <Grid container spacing={2}> 
                {items.map((item) => (
                    <Grid item key={item.id} xs={6}>
                        <Link to="/cart"><Brand image={item.image} /></Link>
                    </Grid>
                ))}
            </Grid> : 
            <Grid>
                <img src={motLayout}/>
            </Grid>
        }
        
        </div>
    );
};

export default Brands;
