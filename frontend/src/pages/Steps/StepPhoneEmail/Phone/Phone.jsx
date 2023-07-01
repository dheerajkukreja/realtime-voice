import React, { useState } from 'react'
import Card from '../../../../Components/shared/Card/Card';
import Button from '../../../../Components/shared/Button/Button';
import TextInput from '../../../../Components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import {sendOtp} from '../../../../http/index'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../store/authSlice';


const Phone = ({ onNext }) => {

    const [phoneNumber, setPhoneNumber] = useState('')

    const dispatch = useDispatch()

    const submit = async () =>{
        if(!phoneNumber) return;
        let data = JSON.stringify({"phone": phoneNumber});
        await sendOtp(data).then((response)=>{
            dispatch(setOtp({'phone': response.data.phone, 'hash': response.data.hash}))
            onNext()
        }).catch(err=>{
            //use toast
            console.log(err.message)
        })
    }
    


    return (
        <Card title="Welcome to Codershouse!" icon="phone">
            <TextInput value={phoneNumber} placeholder={"Enter your phone"} onChange={(e)=>setPhoneNumber(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone