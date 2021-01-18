import {
    Switch,
    Route,
} from "react-router-dom";
import Search from "./shop/Search";
import ShopHome from "./shop/ShopHome";
import Home from "./Home";
import Item from "./shop/Item";
import Signin from "./user/Signin";
import Profile from "./user/Profile";

export default function Main() {
    return(
        <Switch>
            <Route path="/signin">
                <Signin />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/item/:itemId?">
                <Item />
            </Route>
            <Route path="/shop/:page?">
                <ShopHome />
            </Route>
            <Route path="/search/:item?/:page?">
                <Search />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}
