import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const [credentials,setcredentials]=useState({name:'',email:'',password:''});
    const [enable,setEnable]=useState(true);
    let navigation=useNavigate();
    const HandleSubmit=async(e)=>{

        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
      const json=await response.json()
    //   console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authToken);
        navigation('/')
        props.showAlert('Account Created Successfully','success')
      }
      else{
        props.showAlert('Invalid Details','danger');
      }

    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});

    }
    const validatePassword=(e)=>{
        if(e.target.value===credentials.password){
            setEnable(false);
        }

    }
    return (
        <div className="container">
            <form onSubmit={HandleSubmit} >
            <div className="mb-3">
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="name" name="name" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} value={credentials.name} required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" > Password</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={onChange} value={credentials.password} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label" >confirm Password</label>
                    <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={validatePassword} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={enable} >Submit</button>
            </form>


        </div>

    )
}
