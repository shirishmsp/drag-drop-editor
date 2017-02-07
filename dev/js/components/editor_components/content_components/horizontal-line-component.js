import React from 'react';

import RemoveIcon from 'material-ui/svg-icons/content/remove';

const HorizontalLineComponent = React.createClass({
	render: function(){
		return (<div
					style={this.props.styles.div}
					draggable={true}
					className="content-component"
					onDragStart={this.props.onDragStart.bind(null, "line")}>
					<RemoveIcon style={this.props.styles.icon} />
					<p>Horizontal Line</p>
				</div>);
	}
});

export default HorizontalLineComponent;
