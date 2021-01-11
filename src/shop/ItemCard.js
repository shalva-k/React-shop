import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    Link,
} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #c7c7c7"
    },
    topsec: {
        height: "100%"
    }
});

export default function ItemCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.topsec}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="300"
                    image={props.img}
                    title={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Price: ${props.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" variant="outlined" color="primary" component={Link} to={`/item/${props.id}`}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
