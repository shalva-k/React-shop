import Header from "./Header";
import { makeStyles } from '@material-ui/core/styles';
import Main from "./Main";
import Footer from "./Footer";
import UserContext from './UserContext';
import './App.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
   container:  {
       maxWidth: 1230,
       width: "100%",
       margin: "0 auto",
       padding: "0 15px",
       overflow: "hidden"
   }
}));

const token = localStorage.getItem('token');

function App() {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState({
        token
    });
    return (
        <Router>
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                <Header />
                <div className={classes.container}>
                    <Main />
                </div>
                <Footer />
            </UserContext.Provider>
        </Router>
  );
}

export default App;
