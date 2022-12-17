import { useState } from "react";


export const useHabits = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getHabits = async (user) => {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:4000/users/${user.uid}/habits`, {
              method:"GET",
              headers: {
                'authorization':'Bearer ' + user.token
              }
            });
            if (response.status === 200) {
                const data = await response.json()
                setLoading(false)
                return data;
            }
            setLoading(false)
            return [];
        } catch(error) {
            setLoading(false)
            setError(error)
        }
    }

    const addHabit = async (user,habit) => {
        try {
            setLoading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json','authorization':'Bearer ' + user.token },
                body: JSON.stringify(habit)
            };
            const response = await fetch(`http://localhost:4000/users/${user.uid}/habits`, requestOptions);
            if (response.status === 201) {
                const data = await response.json()
                setLoading(false)
                return data;
            }
            else{
                setLoading(false)
                return null;
            }
        } catch(error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteHabit = async(user,position) => {
        try {
            setLoading(true)
            const requestOptions = {
                method: 'DELETE',
                headers: {'authorization':'Bearer ' + user.token },
            };
            const response = await fetch(`http://localhost:4000/users/${user.uid}/habits/${position}`, requestOptions);
            const data = await response.json()
            setLoading(false)
            return data;
        } catch(error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateHabit = async (user,changes) => {
        try {
            setLoading(true)
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json','authorization':'Bearer ' + user.token },
                body: JSON.stringify(changes)
            };
            const response = await fetch(`http://localhost:4000/users/${user.uid}/habits/${changes.position}`, requestOptions);
            const data = await response.json()
            setLoading(false)
            return data;
        } catch(error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        loading,
        error,
        getHabits,
        addHabit,
        deleteHabit,
        updateHabit
    }
}