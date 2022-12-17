import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const {setUser} = useAuthValue()
    const navigate = useNavigate()

    async function signup(data) {
        //Fazer pedido ao backend para registar user
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch('http://localhost:4000/auth/signup', requestOptions);
            if (response.status === 201) {
                setError(null);
                setLoading(false) 
                return true;
            }
            else {
                const error = await response.json()
                setError(error.message)
                console.log(error)
                setLoading(false)
                return false;
            }
        } catch(error) {
            setLoading(false)
            console.log(error)
        }

    }

    async function login(data) {
        // Fazer pedido ao backend para login
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch('http://localhost:4000/auth/login', requestOptions);
            if (response.status === 200) {
                const data = await response.json()
                setError(null);
                setUser(data)
                setLoading(false);
                localStorage.setItem("user",JSON.stringify(data))
                return true;
            }
            else {
                const error = await response.json()
                setError(error.message)
                setLoading(false)
                return false;
            }
        } catch(error) {
            setLoading(false)
            console.log(error)
        }
    }

    function logout() {
        // Fazer pedido de logout
        setUser(null)
        localStorage.clear();
        navigate("/login")
    }

    return {
        error,
        loading,
        signup,
        login,
        logout
    }
}