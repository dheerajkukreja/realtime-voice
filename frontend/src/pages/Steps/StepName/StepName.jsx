import React, { useState } from 'react'
import Card from '../../../Components/shared/Card/Card'
import Button from '../../../Components/shared/Button/Button'
import TextInput from '../../../Components/shared/TextInput/TextInput'
import styles from './StepName.module.css';
import {useDispatch, useSelector} from 'react-redux'

import { setName } from '../../../store/activateSlice';

const StepName = ({onNext}) => {

    const {name} =  useSelector(state=>state.activate)

    const [username, setUsername] = useState(name)
    const dispatch = useDispatch()

    const nextStep = () => {
        if(!username){
            return;
        }
        dispatch(setName(username))
        onNext()
    }


    return (
        <>
            <Card title="What's Your Full name" icon="goggle-emoji"> 
                <TextInput value={username} onChange={(e)=>setUsername(e.target.value)} />
                <p className={styles.paragraph}>
                    People use real at codehouse :) !
                </p>
                <div>
                    <Button text="Next" onClick={nextStep}/>
                </div>
            </Card>
        </>
    )
}

export default StepName