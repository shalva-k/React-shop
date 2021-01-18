import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import {
    Link,
    useHistory
} from "react-router-dom";
import { useState } from "react";
import PaginationItem from "@material-ui/lab/PaginationItem";
import IsLogged from "./hooks/IsLogged";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 50
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: "auto",
        marginRight: 10,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: "auto",
            width: 'auto',
        },
    },
    menu: {
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        padding: 0,
        '& li': {
            margin: "0 10px",
            '& a': {
                color: "#fff",
                textDecoration: "none"
            }
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const [value, setValue] = useState();
    const history = useHistory();

    const {isLoggedIn, saveToken} = IsLogged();

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleSubmit = event => {
        let input = document.getElementById('searchInput');
        history.push("/search/" + value + "/1");
        input.value = "";
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <ul className={classes.menu}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                    </ul>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <form onSubmit={handleSubmit}>
                        <InputBase
                            onChange={handleChange}
                            placeholder="Search…"
                            id="searchInput"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        </form>
                    </div>
                    { isLoggedIn ? <Button
                        variant="contained"
                        component={Link}
                        to="profile"
                        >Profile
                        </Button> :
                        <Button
                            variant="contained"
                            component={Link}
                            to="signin"
                        >Sign In
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
