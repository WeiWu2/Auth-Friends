import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'




export default function Login(props) {
    const initialForm = {
        credentials: {
        username: '',
        password: '',
       
    },
    error:''
        }
    const [loginValues,setLoginValues] = useState(initialForm);
    const history = useHistory()
    const handleChange = (e) => {
        setLoginValues( {
            ...loginValues,
           credentials:{...loginValues.credentials, [e.target.name]: e.target.value},
           error:''
        })

    }
    const handleLogin = (e) => {
            e.preventDefault();
            axios.post('http://localhost:5000/api/login', loginValues.credentials).then((res) => {
                localStorage.setItem('token', JSON.stringify(res.data.payload))
                history.push('/friendslist')
            })
            .catch((err) => {
                setLoginValues(
                  
                    {
                        ...loginValues,
                        error:err.response.data.error
                    }
                 )
            })
    }
    return (

        <div>
            <form onSubmit={handleLogin}>
                <div>
                <label>Username: </label>
                <input name='username' value={loginValues.credentials.username} type='text' onChange={handleChange}></input>
                </div>
               <div>
               <label>Password: </label>
               <input name='password' value={loginValues.credentials.password} type='password' onChange={handleChange}></input>
               </div>
               <p style={{color: 'red', fontSize: '12px'}}>{loginValues.error}</p>
              <button>Login</button>
            </form>
            <p>Lambda School {'i<3Lambd4'}</p>
        </div>
    )
}
