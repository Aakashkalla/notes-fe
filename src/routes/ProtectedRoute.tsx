import { useState, useEffect, type ReactElement} from "react"
import { useNavigate } from "react-router-dom"
import api from "../lib/axios"
const ProtectedRoute = ({children} : {children : ReactElement}) => {
    const[loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchResponse = async () =>{
            try{
                await api.get('/auth/me')                
                setLoading(false)
            }catch(e){
                setLoading(false)
                navigate('/login', {replace : true})
            }   
        }
        fetchResponse()
    }, [])
    return (
    <div>
        {loading ? <div>Loading</div> : <>{children}</>}
    </div>
    )
}

export default ProtectedRoute
