import React from 'react';
import { SketchPicker } from 'react-color';
const styles = {
	button: { 
	    margin: "10px",
	    width: "20px",
	    height: "20px",
	    borderRadius: "10px",
	    border: "1px solid #3f51b5",
	    backgroundColor: "white"
	}
}
const ColorPicker = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false
		};
	},
	handleChangeComplete: function(color){
		if(color != null)
			this.props.onColorChange(color.hex, this.props.columnIndex);
	},
	togglePicker: function(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){
		var sketchPicker;
		if(this.props.color != null)
			styles.button.backgroundColor = this.props.color;
		if(this.props.color != null && this.state.isOpen)
			sketchPicker = (<SketchPicker
						color={this.props.color}
						className="color-picker"
				        onChangeComplete={ this.handleChangeComplete }
				      />);
		else if(this.state.isOpen)
			sketchPicker = (<SketchPicker
						className="color-picker"
				        onChangeComplete={ this.handleChangeComplete }
				      />);

		return (<div>
					{this.props.buttonText}
					<button 
						style={styles.button}
						onClick={this.togglePicker}>
					</button>
					{sketchPicker}
				</div>);
	}
});

export default ColorPicker;
