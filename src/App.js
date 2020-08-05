import React , {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './containers/Navigation/Navigation';
import Logo from './containers/Logo/Logo';
import Rank from './containers/Rank/Rank';
import SignIn from './containers/signIn/SignIn';
import Register from './containers/Register/Register';
import FaceRecognition from './containers/FaceRecognition/FaceRecognition';
import ImageLinkForm from './containers/ImageLinkForm/ImageLinkForm';



const particlesOption = {
  particles: {
    number: {
      value : 88,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

const initialState = {
      input : '',
      imageUrl :'',
      box : {},
      route : "signIn",
      isSignedIn : false,
      user: {
        id:'',
        name: '',
        email:'',
        entry:0,
        joined: ''
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state= initialState
  }

  loadUser = (data) =>{
    this.setState({user : {
        id:data.id,
        name: data.name,
        email:data.email,
        entry: data.entry,
        joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  onInputChange=(event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit= () => {
    this.setState({imageUrl : this.state.input});
    fetch('https://radiant-cliffs-11452.herokuapp.com/imageurl',{
          method : 'post',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            input : this.state.input
          })
        })
    .then(response=> response.json())
    .then(response=> {
      if(response){
        fetch('https://radiant-cliffs-11452.herokuapp.com/image',{
          method : 'put',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            id : this.state.user.id
          })
        }).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entry:count}))
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
  }

  onRouteChange=(route) => {
    if(route === 'signIn'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route: route});
  }

  render(){
    const  {box,route,isSignedIn,imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className="particles" 
                params={particlesOption}
          />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
            ?<div>
              <Logo />
              <Rank name={this.state.user.name} entry={this.state.user.entry} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
             </div>
            :(
                route ==='signIn'
                ?<SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
                 :<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
  );
  }
}

export default App;
