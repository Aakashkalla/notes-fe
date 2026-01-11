import {useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../lib/axios";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const[loading,setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function signIn(){
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;

        if(!email || !password){
            setError("Email and Password are required");
            return;
        }

        setError(null);
        setLoading(true);
        try{
            await api.post('/auth/login',{
                email,
                password
            })
            navigate('/dashboard');
        }catch(e){
            setError("Invalid email or password");
        }finally{
            setLoading(false)
        }
    }

    return (
    <div>
            <label>Email</label>
            <input ref={emailRef} type="email" placeholder="Email"/>
            <label>Password</label>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button disabled={loading} onClick={()=>signIn()}>{loading ? "Signing in..." : "Submit"}</button>
            {error && <p>{error}</p>}
    </div>
    )
}

export default Login
