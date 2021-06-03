import { Component } from "react"
import axios from 'axios'
import {renderer, toggleAudio, toggleVideo, endcall} from './renderer.js'

class HostVc extends Component
{
  
	CreateVC=()=>
	{
		const roomcreateURL = 'https://codebois-server.herokuapp.com/'
		axios.get(roomcreateURL)
		.then(response => {
			console.log(response.data)
			renderer(response.data, document.getElementById('name').value)
		})
		.catch(err => console.error(err))
	}
	render() {
		return(
				<div className = "vcinfo">
					<form onSubmit = {(e)=>{e.preventDefault(); this.CreateVC()}}>
						Name <input type="text" id = "name"></input><br></br><br></br>
						<input type="submit" value="Host"></input>
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

export default HostVc