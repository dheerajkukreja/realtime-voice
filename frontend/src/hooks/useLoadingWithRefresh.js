import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setAuth } from "../store/authSlice"
export const useLoadingWithRefresh = ()=>{
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        async function getDataFromServer(){
            try{
                const { data} = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/user/refresh-token`,
                    {
                        withCredentials: true
                    }
                )
                dispatch(setAuth(data))
                setLoading(false)
            }catch(err){
                console.log(err)
                setLoading(false)
            }
        }
        getDataFromServer()
    }, [dispatch])
    return {loading}
} 