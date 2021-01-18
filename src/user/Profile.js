import IsLogged from "../hooks/IsLogged";
import {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        margin: '50px auto'
    },
    media: {
        height: 400,
    },
    list: {
        display: "flex",
        alignItems: "center",
        '& h4': {
            marginRight: 5
        }
    },
    logout: {
        marginLeft: "auto",
    }
});

export default function Profile() {
    const classes = useStyles();
    const { token, removeToken } = IsLogged();
    const [userInfo, setUserInfo] = useState();
    let history = useHistory();

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function logOut () {
        removeToken();
        history.push('/');
    }

    useEffect(() => {
        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/profile', config)
            .then(response => {
                setUserInfo(response.data.data);
            })
            .catch(() => {
                alert('You are not Signed in');
            })
    }, [token]);

    function renderUserInfo () {
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={userInfo.profile_picture}
                        title={userInfo.first_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {userInfo.username}'s profile
                        </Typography>
                        <div className={classes.list}>
                            <h4>First name: </h4> <p>{userInfo.first_name}</p>
                        </div>
                        <div className={classes.list}>
                            <h4>Last name: </h4> <p>{userInfo.last_name}</p>
                        </div>
                        <div className={classes.list}>
                            <h4>Age: </h4> <p>{userInfo.age}</p>
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" className={classes.logout} color="secondary" onClick={logOut}>
                        Sign Out
                    </Button>
                </CardActions>
            </Card>
        )
    }

    function renderError(){
        return (
            <Card className={classes.root}>
                <h2>Loading...</h2>
            </Card>
        )
    }

    return (
        <>
            { userInfo ? renderUserInfo() : renderError() }
        </>
    )
}
