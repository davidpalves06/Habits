import React from 'react'
import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const {user} = useAuthValue()
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwords = {
            oldPassword,
            newPassword,
            confirmPassword
        }

        setLoading(true)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','authorization':'Bearer ' + user.token },
            body: JSON.stringify(passwords)
        };
        try {
            const response = await fetch(`http://localhost:4000/users/${user.uid}/password`, requestOptions);
            if (response.status === 200) {
                setError(null);
                setLoading(false);
                navigate("/dashboard")
            }
            else {
                const error = await response.json()
                setError(error.message)
                setLoading(false)
            }
        } catch(error) {
            setLoading(false)
            setError(error)
        }
    }
  return (
    <div className='loginPage'>
        <div className='loginContainer'>
        <h2>Change Password</h2>
        <p>Confirm your old password then insert the new one and confirm it!</p>
        <form onSubmit={handleSubmit} className='formContainer'>
            <div className='formEntry'>
                <input type="password" required name="oldPassword" placeholder='Confirm old password...'
                onChange={(e) => setOldPassword(e.target.value)} value={oldPassword || ""}/>
            </div>
            <div className='formEntry'>
                <input type="password" required name="newPassword" placeholder='Insert new password'
                onChange={(e) => setNewPassword(e.target.value)} value={newPassword || ""}/>
            </div>
            <div className='formEntry'>
                <input type="password" required name="confirmPassword" placeholder='Confirm new password'
                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}/>
            </div>
            {loading && <button disabled>Wait...</button>}
            {!loading && <button>Change</button>}
        </form>
        </div>
        {error && <p className='error'>{error}</p>}
    </div>
  )
}

export default ChangePassword