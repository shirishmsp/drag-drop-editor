import React from 'react';

import TextIcon from 'material-ui/svg-icons/editor/text-fields';

const TextComponent = React.createClass({
	render: function(){
		return (<div
					style={this.props.styles.div}
					draggable={true}
					className="content-component"
					onDragStart={this.props.onDragStart.bind(null, "text")}>
					<TextIcon style={this.props.styles.icon} />
					<p>Text</p>
				</div>);
	}
});

export default TextComponent;
