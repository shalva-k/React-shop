import Header from "./Header";
import { makeStyles } from '@material-ui/core/styles';
import Main from "./Main";
import Footer from "./Footer";
import './App.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   container:  {
       maxWidth: 1230,
       width: "100%",
       margin: "0 auto",
       padding: "0 15px",
       overflow: "hidden"
   }
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <Header />
            <div className={classes.container}>
                <Main />
            </div>
            <Footer />
        </Router>
  );
}

export default App;
