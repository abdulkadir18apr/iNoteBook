import React, { useState } from 'react'
import Alert from './Alert';
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const [credential,setCredentials]=useState({email:'',password:''});
    const navigate=useNavigate();


    const onChange=(e)=>{
        setCredentials({...credential,[e.target.name]:e.target.value});

    }
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({email:credential.email,password:credential.password})
      });
      const json=await response.json()
      console.log(json.authToken)
      if(json.success){
        //Save the Token And Redirect
        localStorage.setItem('token',json.authToken);
        props.showAlert("Login Successfull",'success');
        navigate('/');

      }
      else{
       props.showAlert('Invalid Credentials','danger')
      }

    }
    return (
        <div className='container'>
            <form onSubmit={HandleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credential.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password"  name="password" className="form-control" id="password" value={credential.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>


        </div>
    )
}
