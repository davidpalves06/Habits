import {useState} from 'react'
import "./Login.css"
import { useAuthentication } from '../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {login,loading,error} = useAuthentication()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const credentials = {
      email,
      password
    }

    const logado = await login(credentials);

    if (logado) {
      navigate("/dashboard")
    }
    else {
      setPassword("")
    }

    
  }
  return (
    <div className="loginPage">
      <div className='loginContainer'>
          <h2>Login</h2>
          <form className='formContainer' onSubmit={handleSubmit}>
          <div className='formEntry'>
              <input type="email" name='email' placeholder='E-mail' required
              onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div className='formEntry'>
              <input type="password" name='password'placeholder='Password' required
              onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          {loading && <button disabled>Wait...</button>}
          {!loading && <button>Login</button>}
          </form>
      </div>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}

export default Login