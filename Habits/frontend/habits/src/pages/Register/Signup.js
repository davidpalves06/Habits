import React from 'react'
import { useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Signup = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmPassword] = useState("")
    const {signup,loading,error} = useAuthentication()
    const [sucess,setSucess] = useState(null)

    const clearFields = () => {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmpassword
        }


        const criado = await signup(user)

        if (criado) {
            clearFields();
            setSucess("Usuário criado!")
        }
        else {
            setSucess(null)
        }

    }

  return (
    <div className="loginPage">
        <div className='loginContainer'>
            <h2>Create Account</h2>
            <form className='formContainer' onSubmit={handleSubmit}>
                <div className='formEntry'>
                    <input type="text" name='name' placeholder='Name' required
                    onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className='formEntry'>
                    <input type="email" name='email' placeholder='E-mail' required
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='formEntry'>
                    <input type="password" name='password'placeholder='Password' required
                    onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <div className='formEntry'>
                    <input type="password" name='confirmpassword'placeholder='Confirm password' required
                    onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword}/>
                </div>
                {loading && <button disabled>Wait...</button>}
                {!loading && <button>Register</button>}
            </form>
        </div>
            {error && <p className='error'>{error}</p>}
            {sucess && <p className='sucesso'>{sucess}</p>}
    </div>
  )
}

export default Signup