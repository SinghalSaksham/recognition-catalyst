import React from 'react';

const Rank = ({name,entry}) =>{
	return(
		<div>
			<div className="f3 white">
				{`${name}, your current entry count is...`}
			</div>
			<div className="f1 white">
				{entry}
			</div>
		</div>
	);
}

export default Rank;