import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useParams, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    item:  {
        height: "100%",
    },
    root: {
        margin: 40,
        display: "flex",
        justifyContent: "center",
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ShopHome() {
    const params = useParams();
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState([]);
    const classes = useStyles();
    let page = params.page || 1;
    const itemLimit = 8;

    page = parseInt(page);

    const totalPages = Math.ceil(totalItems / itemLimit);


    useEffect(() => {
        axios.get(`https://us-central1-js04-b4877.cloudfunctions.net/api/products?_page=${page}&_limit=${itemLimit}`)
            .then(response => {
                setItems(response.data);
                setTotalItems(response.headers['x-total-count']);
            })
            .catch(error => {
                console.log(error);
            })
    }, [page]);


    return (
        <>
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
            <div className={classes.root}>
                <Pagination
                    page={page}
                    count={totalPages}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/shop${item.page === 1 ? '' : `/${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            </div>
        </>
    );
}
