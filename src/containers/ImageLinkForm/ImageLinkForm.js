import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{
	return(
		<div>
			<p className="f3">
				{'This catalyst will detect face in your pictures. Give it a try'}
			</p>
			<div className="center" >
				<div className="pa4 br3 shadow-5 center form">
					<input 
						className="f4 pa2 w-70 center" type='text' 
						onChange={onInputChange}
					/>
					<button 
						className="w-30 pointer f4 dib grow link ph3 pv2 white bg-light-purple ba b--white-60"
						onClick={onButtonSubmit}
						>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;