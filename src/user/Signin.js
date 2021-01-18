import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import IsLogged from "../hooks/IsLogged";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: 15,
            width: '100%',
        },
    },
    wrap: {
        maxWidth: 350,
        margin: "15px auto",
        display: "flex",
        flexDirection: "column"
    },
    submit: {
        height: 56,
        border: 0,
        borderRadius: 4,
        backgroundColor: "#3f51b5",
        fontSize: "0.875rem",
        color: "#fff",
        cursor: "pointer"
    }
}));

export default function Signin() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const { saveToken } = IsLogged();

    function onSignIn(event) {
        event.preventDefault();
        axios.post('https://us-central1-js04-b4877.cloudfunctions.net/api/login', {username, password})
            .then(response => {
                const access_token = response.data.access_token;
                saveToken(access_token);
                history.push('/');
            })
            .catch(() => {
                alert('Wrong username or password');
            })
    }

    return (
        <form className={classes.root} autoComplete="off" onSubmit={onSignIn}>
            <div className={classes.wrap}>
                <TextField
                    id="userName"
                    label="Username"
                    variant="outlined"
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" value="Sign In" className={classes.submit} />
            </div>
        </form>
    );
}
