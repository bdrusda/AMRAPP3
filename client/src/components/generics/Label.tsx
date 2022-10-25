import React, { Fragment, useState } from 'react';

class Label {
	id: string;
	name: string;
	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}

const LabelView = (label: Label) => {
	return (
		<Fragment>
			<div className='label' id={label.id}>
				{label.name}:
			</div>
		</Fragment>
	);
};

export default LabelView;
