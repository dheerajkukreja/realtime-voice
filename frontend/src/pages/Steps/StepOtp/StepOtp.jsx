import React, { useState } from 'react'
import TextInput from '../../../Components/shared/TextInput/TextInput'
import styles from './StepOtp.module.css';
import Card from '../../../Components/shared/Card/Card';
import Button from '../../../Components/shared/Button/Button';
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux'

const StepOtp = () => {
    const [otp, SetOtp] = useState('')
    const dispatch = useDispatch()
    const {phone, hash} = useSelector((state)=>state.auth.otp)
    const submit = async () =>{
        if(!otp || !phone || !hash) return;
        let data = JSON.stringify({otp, phone, hash});
        await verifyOtp(data).then((response)=>{
            dispatch(setAuth(response.data))
        }).catch(err=>{

        })
        
    }

    return (
        <div className='cardWrapper'>
            <Card title="Enter the code we just sent you" icon="lock-emoji"> 
                <TextInput value={otp} onChange={(e)=>SetOtp(e.target.value)} />
                <div className={styles.actionButtonWrap}>
                        <Button text="Next" onClick={submit}/>
                </div>
            </Card>
        </div>
        
    )
}

export default StepOtp