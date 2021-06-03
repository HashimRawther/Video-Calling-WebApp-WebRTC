import axios from 'axios'
import { Component } from 'react'
import {renderer, toggleAudio, toggleVideo, endcall} from './renderer.js'

class JoinVc extends Component
{
	joinVC=()=>
	{
		var roomid = document.getElementById('roomid').value
		const roomJoinURL = 'https://codebois-server.herokuapp.com/'+roomid
		axios.get(roomJoinURL)
		.then(response => {
			console.log(response.data)
			renderer(roomid, document.getElementById('name').value)
		})
		.catch(err => console.error(err))
	}

	render()
	{
		return(
			<div className = "vcinfo">
				<form onSubmit={(e)=>{e.preventDefault(); this.joinVC()}}>
					Name <input type="text" id = 'name'></input><br></br>
					Room <input type="text"  id = "roomid"></input><br></br><br></br>
					<input type="submit" value="Join"></input>
				</form>
				<div>
					<button onClick={toggleAudio}>ToggleAudio</button>
					<button onClick={toggleVideo}>ToggleVideo</button>
					<button onClick={endcall}>EndCall</button>
				</div>
			</div>
			
		)
		
	}
}

export default JoinVc