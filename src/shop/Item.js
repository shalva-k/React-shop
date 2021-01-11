import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: "15px 0"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    media: {
        maxWidth: "100%",
        width: "100%",
    },
}));

export default function Search() {
    const params = useParams();
    const [item, setItem] = useState([]);
    const [reviews, setReviews] = useState([]);
    const classes = useStyles();
    let itemId = params.itemId || 1;
    let showReviews = '';

    useEffect(() => {
        axios.get(`https://us-central1-js04-b4877.cloudfunctions.net/api/products/${itemId}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [item]);
    useEffect(() => {
        axios.get(`https://us-central1-js04-b4877.cloudfunctions.net/api/products/${itemId}/reviews`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [item]);

    if (reviews.length > 1) {
        showReviews = "Reviews:"
    }

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
                        <Paper elevation={3} className={classes.paper}>
                            <img
                                className={classes.media}
                                src={item.image}
                                title={item.title}
                                alt={item.title}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom>
                                Seller: {item.seller}
                            </Typography>
                            <Typography variant="button" display="block" gutterBottom>
                                Price: ${item.price}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {item.description}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Typography variant="h6" component="h3" gutterBottom>
                    {showReviews}
                </Typography>
                {
                    reviews.map((review, i) => (
                        <Card className={classes.root} key={review.id}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {review.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </>
    );
}
