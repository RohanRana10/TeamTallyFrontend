import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [authToken, setAuthToken] = useState(null);
    const saveUserData = (data) => {
        setUser(data);
    }

    const removeUserData = () => {
        setUser({});
    }

    const saveUserToken = async (token) => {
        try {
            await AsyncStorage.setItem('authToken', token);
            setAuthToken(token);
            console.log("token saved");
        } catch (e) {
            console.log(e);
        }
    }


    const deleteUserToken = async (token) => {
        try {
            await AsyncStorage.removeItem('token');
            console.log("token deleted")
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <UserContext.Provider value={{ user, authToken, saveUserData, removeUserData, saveUserToken, deleteUserToken }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };