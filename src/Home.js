import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "./shop/ItemCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    item:  {
        height: "100%",
    }
}));

export default function Home() {
    const [items, setItems] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/products?_sort=id&_order=desc&_limit=10')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <Grid container spacing={3}>
            {
                items.map((item, i) => (
                    <Grid item xs={12} sm={4} md={3} key={item.id}>
                        <ItemCard
                            className={classes.item}
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            img={item.image}
                            price={item.price}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}
