import React from 'react';
import ColorPicker from './color-picker'
import TextField from 'material-ui/TextField';
import renderHTML from 'react-render-html';
 
const styles = {
	numberInput: {
		width: 100,
		marginRight: 20
	}
};
const EditImage = React.createClass({
	style: {},
	componentWillMount: function() {
		this.style = this.props.content.style;
	},
	getInitialState: function(){
		return {
			content: this.props.content,
		};
	},
	updateState: function(key, value){
		var newContent = this.state.content;
		if(key == "image"){
			newContent.setAttribute("src", value);
		}
		else if(key == "link"){
			newContent.setAttribute("data-href", value);
		}
		else{
			newContent.style[key] = value;
		}
		this.props.onContentEdit(renderHTML(newContent.outerHTML));
	},
	onWidthChange: function(event){
		this.updateState("width", event.target.value + "px");
	},
	onHeightChange: function(event){
		this.updateState("height", event.target.value + "px");
	},
	onWidthPercentageChange: function(event){
		this.updateState("width", event.target.value + "%");
		this.updateState("height", "initial");
	},
	onHeightPercentageChange: function(event){
		this.updateState("height", event.target.value + "%");
		this.updateState("width", "initial");
	},
	onPaddingChange: function(event){
		this.updateState("padding", event.target.value + "px");
	},
	onMarginChange: function(event){
		this.updateState("margin", event.target.value + "px");
	},
	onBorderWidthChange: function(event){
		this.updateState("borderWidth", event.target.value + "px");
	},
	onBackgroundColorChange: function(color){
		this.updateState("backgroundColor", color);
	},
	onBorderColorChange: function(color){
		this.updateState("borderColor", color);
	},
	onImageChange: function(event){
		this.updateState("image", event.target.value);
	},
	onLinkUrlChange: function(event){
		this.updateState("link", event.target.value);
	},
	render: function(){
		const this1 = this;
		return (<div className="edit-content">
					<TextField
				      floatingLabelText="Width px"
				      hintText="0"
				      type="number"
				      style={styles.numberInput}
				      onChange={this1.onWidthChange}
				      floatingLabelFixed={true}
				    />
				    <TextField
				      floatingLabelText="Width %"
				      hintText="0"
				      type="number"
				      style={styles.numberInput}
				      onChange={this1.onWidthPercentageChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText="Height px"
				      hintText="0"
				      type="number"
				      style={styles.numberInput}
				      onChange={this1.onHeightChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText="Height %"
				      hintText="0"
				      type="number"
				      style={styles.numberInput}
				      onChange={this1.onHeightPercentageChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText="Padding"
				      hintText="0"
				      type="number"
				      style={styles.numberInput}
				      onChange={this1.onPaddingChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText="Margin"
				      hintText="0"
				      style={styles.numberInput}
				      type="number"
				      onChange={this1.onMarginChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText="Border Width"
				      hintText="0"
				      type="number"
				      style={styles.numberInput}
				      onChange={this1.onBorderWidthChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText=""
				      hintText="http://www.example.com/"
				      onChange={this1.onLinkUrlChange}
				      floatingLabelFixed={true}
				    />
					<TextField
				      floatingLabelText="Image Link"
				      hintText="http://www.example.com/image.jpg"
				      onChange={this1.onImageChange}
				      floatingLabelFixed={true}
				    />
				    <ColorPicker
				    	columnIndex={0}
				    	buttonText="Background Color"
				    	onColorChange={this1.onBackgroundColorChange} />
				    <ColorPicker
				    	columnIndex={0}
				    	buttonText="Border Color"
				    	onColorChange={this1.onBorderColorChange} />
				</div>);
	}
});

export default EditImage;
