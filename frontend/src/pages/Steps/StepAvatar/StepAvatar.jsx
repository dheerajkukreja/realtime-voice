import React, { useEffect, useState } from 'react'
import Card from '../../../Components/shared/Card/Card'
import Button from '../../../Components/shared/Button/Button'
import styles from './StepAvatar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http'
import { setAuth } from '../../../store/authSlice'
import Loader from '../../../Components/shared/Loader/Loader'




const StepAvatar = ({onNext}) => {

    const {name, avatar} = useSelector((state)=>state.activate)

    const dispatch = useDispatch()


    const [image, setImage] = useState('/images/monkey-avatar.png')


    const [unMounted, setUnMounted] = useState(false)

    const [loading, setLoading] = useState(false)

    const submit = async () =>{
        if(!name || !avatar) return; //use toast
        setLoading(true)
        try{
            const {data} = await activate({
                name,
                avatar
            })
            if(data.auth){
                if(!unMounted)
                    dispatch(setAuth(data))
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        return () =>{
            setUnMounted(true)
        }
    }, [])



    const captureImage = (e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setImage(reader.result)
            dispatch(setAvatar(reader.result))
        }
    }

    if(loading) return <Loader message="Activation in progres..."/>
    
    return (
        <>
            <Card title={`Okay ${name}`} icon="monkey-emoji"> 
                <p className={styles.subHeading}>
                    How is this photo?
                </p>
                <div className={styles.avatarWrapper}>
                    <img src={image} alt='avatar' className={styles.avatarImage} />
                </div>
                <div>
                    <input id="avatarInput" onChange={captureImage}  type="file" className={styles.avatarInput}/>
                    <label htmlFor='avatarInput'>
                        Chose a diffrent Photo
                    </label>
                </div>
                <div>
                    <Button text="Next" onClick={submit}/>
                </div>
            </Card>
        </>
    )
}

export default StepAvatar