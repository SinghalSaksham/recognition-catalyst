import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) =>{
	if(isSignedIn){
		return(
			<nav style={{display:"flex", justifyContent:"flex-end"}} >
				<p onClick={()=>onRouteChange('signIn')} className="f3 dim pointer underline black pa3 link">Sign Out</p>
			</nav>
		);
	}
	else{
		return(
			<nav style={{display:"flex", justifyContent:"flex-end"}} >
				<p onClick={()=>onRouteChange('signIn')} className="f3 dim pointer underline black pa3 link">Sign In</p>
				<p onClick={()=>onRouteChange('Register')} className="f3 dim pointer underline black pa3 link">Register</p>
			</nav>
		);
	}
}

export default Navigation;