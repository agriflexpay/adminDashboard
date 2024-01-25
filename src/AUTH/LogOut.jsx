import {useLocalStorage} from '../hooks/useLocalStorage'
import { axiosInstance } from '../API/axois/AxiosInstance';
import { useQuery } from 'react-query';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';


const LogOut = () => {
    const history = useHistory()
    const { setUser } = useAuth();
    const [user, setUser1] = useLocalStorage('user', null);
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.post("/api/auth/logout")
            return response
        } catch (error) {
            //console.log(error.confiq);
        }
    }

    const { data, error } = useQuery("users", fetchUsers);
    console.log(data)
    if (data) {
        setUser(null)
        history.push("/login")
    }
    return (
        <div>
            <h1>Logging Out</h1>
        </div>
    )
}