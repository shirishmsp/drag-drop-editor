import React from 'react';

import PhotoIcon from 'material-ui/svg-icons/editor/insert-photo';

const TextComponent = React.createClass({
	render: function(){
		return (<div
					style={this.props.styles.div}
					draggable={true}
					className="content-component"
					onDragStart={this.props.onDragStart.bind(null, "image")}>
					<PhotoIcon style={this.props.styles.icon} />
					<p>Image</p>
				</div>);
	}
});

export default TextComponent;
