import React from 'react';

import ButtonIcon from 'material-ui/svg-icons/image/crop-16-9';

const TextComponent = React.createClass({
	render: function(){
		return (<div
					style={this.props.styles.div}
					draggable={true}
					className="content-component"
					onDragStart={this.props.onDragStart.bind(null, "button")}>
					<ButtonIcon style={this.props.styles.icon} />
					<p>Button</p>
				</div>);
	}
});

export default TextComponent;
