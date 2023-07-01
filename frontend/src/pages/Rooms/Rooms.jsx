import React, { useEffect, useState } from 'react'
import AddRoomModal from '../../Components/AddRoomModal/AddRoomModal'
import RoomCard from '../../Components/RoomCard/RoomCard'
import { getAllRooms } from '../../http'
import styles from './Rooms.module.css'

const Rooms = () => {
    const [showModal, setShowModal] = useState(false)
    const [rooms, setRooms] = useState([])
    const openModal = () =>{
        setShowModal(true)
    }
    useEffect(()=>{
        const fetchRooms = async ()=>{
            const {data} = await getAllRooms()
            setRooms(data)
        }
        fetchRooms()
    },[])
    return (
        <>
            <div className='container'>
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>
                            All Voice Rooms
                        </span>
                        <div className={styles.searchBox}>
                            <img src='/images/search-icon.png' alt="search"/> 
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={openModal} className={styles.startRoomButton} >
                            <img src='/images/add-room-icon.png' alt="add room" /> <span>Start Room</span>
                        </button>
                    </div>
                </div>
                <div className={styles.roomList}>
                    {
                        rooms.map(room => <RoomCard  key={room.id} room={room}></RoomCard>)
                    }
                </div>
            </div>
            { showModal && <AddRoomModal onClose={() =>{setShowModal(false)}} />}
        </>
    )
}

export default Rooms