import React, {Component} from 'react'
import './App.css'; 
import HostVc from './Component/hostvc'
import JoinVc from './Component/joinvc'

class App extends Component {

    constructor(props){
      super(props);
      this.state = { showHostVc: false, showJoinVc: false, count: 0}
      this.setHost = this.setHost.bind(this)
      this.setJoin = this.setJoin.bind(this)
      //this.setState({ showHostVc: false, showJoinVc: false }) 
    }
  
    setHost(e)
    {
      e.preventDefault();
      this.setState( {showHostVc: true} )
      this.setState({showJoinVc: false})
      
    }
  
    setJoin(e)
    {
      e.preventDefault();
      this.setState({showJoinVc: true})
      this.setState({showHostVc: false})
  
    }
    render() {
        return (
            <div className="App">
                <div className="vc-options">
                    <button onClick = {this.setHost}>Host VC</button>
        
                    <button onClick = {this.setJoin}>Join VC</button>
        
                </div>
                <div>
                    {
                        this.state.showHostVc? <HostVc/>: null
                    }
                    {
                        this.state.showJoinVc? <JoinVc/> : null
                    }
                </div>
                <div id="video-grid"></div>
            </div>
        );
    }

}

export default App;
