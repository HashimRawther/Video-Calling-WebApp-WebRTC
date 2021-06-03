const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const mongoose = require('mongoose')
const Peer = require('./models/peerinfos')

const port = process.env.PORT || 3030

let roomId
const dburl = 'mongodb+srv://CodeBois:codebois@peerdata.cccuz.mongodb.net/meet2code?retryWrites=true&w=majority'
mongoose.connect(dburl, { useNewUrlParser: true , useUnifiedTopology: true })
.then((res)=>{
  	console.log("Atlas Db connected")
})
.catch((err)=>{
  	console.log(err)
})

app.get('/', (req, res) => {

    roomid = uuidV4()
    roomId = roomid
    res.send(roomid)
})

app.get('/:room', (req, res) => {
    roomId= req.params.room 
    res.send(roomId)
})

io.on('connection', socket => {

	socket.on('audio-toggle-sender', (userId, astatus) => {
		Peer.updateOne({peerid: userId}, {
			audioStatus: astatus, 
		}, function(err, numberAffected, rawResponse) {
		   //handle it
		})
		socket.broadcast.to(roomId).emit('audio-toggle-receiver', {userId: userId, audioStatus: astatus})
	})

	socket.on('video-toggle-sender', (userId, vstatus) => {
		Peer.updateOne({peerid: userId}, {
			videoStatus: vstatus, 
		}, function(err, numberAffected, rawResponse) {
		   //handle it
		})
		socket.broadcast.to(roomId).emit('video-toggle-receiver', {userId: userId, videoStatus: vstatus})
	})

	socket.on('peer-track-sender', ()=>{

		Peer.find({roomid: roomId}, {'_id': 0, 'username': 1, 'peerid': 1, 'audioStatus': 1, 'videoStatus': 1})
		.then((mediaRes)=>{
			
			let res = mediaRes.map((x)=>x.peerid)
			console.log(res) 
			console.log(mediaRes)
			socket.broadcast.to(roomId).emit('peer-track-receiver', res, mediaRes)     
		})
	})

	socket.on('join-room', (uname, roomId, userId, astatus, vstatus) => {
		socket.join(roomId)
		socket.broadcast.to(roomId).emit('user-connected', userId)
		// peers.push(userId)

		const peer = new Peer({
			username: uname,
			roomid: roomId,
			peerid: userId,
			audioStatus: astatus,
			videoStatus: vstatus
		})
		peer.save()
		
		socket.on('disconnect', () => {

		// console.log("socket disc")
		// console.log(userId)
		socket.broadcast.to(roomId).emit('user-disconnected', userId)
		Peer.deleteOne({peerid: userId}, function (err) {
			if (err) return handleError(err);
		})
		// peers.splice( peers.indexOf(userId), 1)
		
		})
	})
})


server.listen(port)