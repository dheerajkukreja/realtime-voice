import React, { useState } from 'react'
import TextInput from '../shared/TextInput/TextInput'
import styles from './AddRoomModal.module.css'
import { createRoom as create } from '../../http'
import { useNavigate } from "react-router-dom";
const AddRoomModal = ({onClose}) => {
    const [roomType, setRoomType] = useState('open')
    const [topic, setTopic] = useState('')
    const navigate = useNavigate()
    
    const createRoom = async () =>{
        try{
            if(!topic) return
            const {data} = await create({topic, roomType})
            navigate(`/room/${data.id}`)
        }catch(err){
            console.log(err.message)
        }
        
    }


    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src='/images/close.png' alt='close' />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>Enter the Topic To be discussed</h3>
                    <TextInput fullwidth="true" value={topic} onChange={(e)=> setTopic(e.target.value)} />
                    <h3 className={styles.subHeading}>Room Types</h3>
                    <div className={styles.roomTypes}>
                        <div className={`${styles.typeBox} ${roomType==='open' ? styles.active : ""}`} onClick={()=>{setRoomType('open')}}>
                            <img src='/images/globe.png' alt='globe' />
                            <span>Open</span>
                        </div>
                        <div className={`${styles.typeBox} ${roomType==='social' ? styles.active : ""}`} onClick={()=>{setRoomType('social')}}>
                            <img src='/images/social.png' alt='social' />
                            <span>Social</span>
                        </div>
                        <div className={`${styles.typeBox} ${roomType==='private' ? styles.active : ""}`} onClick={()=>{setRoomType('private')}}>
                            <img src='/images/lock.png' alt='lock' />
                            <span>Closed</span>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <h2>
                        Start a room open to everyone
                    </h2>
                    <button onClick={createRoom} className={styles.footerButton}>
                        <img src='/images/celebration.png' alt="celebration"/>
                            <span>Let's Go</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal