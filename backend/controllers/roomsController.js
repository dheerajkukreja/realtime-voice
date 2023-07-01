const RoomDto = require("../dto/room-dto")
const roomsService = require("../services/rooms-service")

module.exports.createRoom = async(req, res) =>{
    const {topic, roomType} = req.body
    if(!topic || !roomType){
        return res.status(400).json({status:false, msg:"All Fields are required..."})    
    }
    console.log(req.user._id)
    const room = await roomsService.create({
        topic,
        roomType,
        ownerId:req.user._id
    })
    res.status(200).json(new RoomDto(room))
}

module.exports.getRoom = async(req, res) =>{
    const rooms = await roomsService.getAllRooms(['open'])
    const allRooms = rooms.map((room)=> new RoomDto(room))
    res.status(200).json(allRooms)
}

