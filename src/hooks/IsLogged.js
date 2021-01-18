import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

export default function IsLogged() {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    function saveToken(token) {
        localStorage.setItem('token', token);
        setCurrentUser({
            token
        });
    }

    function removeToken(token) {
        localStorage.removeItem('token', token);
        setCurrentUser('');
    }

    return {
        isLoggedIn: !!currentUser.token,
        token: currentUser.token,
        saveToken,
        removeToken
    }
}
