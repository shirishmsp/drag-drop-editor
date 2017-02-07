import React from 'react';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import LeftAlignIcon from 'material-ui/svg-icons/editor/format-align-left';
import RightAlignIcon from 'material-ui/svg-icons/editor/format-align-right';
import CenterAlignIcon from 'material-ui/svg-icons/editor/format-align-center';
import JustifyAlignIcon from 'material-ui/svg-icons/editor/format-align-justify';

import ColorPicker from './color-picker'

const styles = {
	numberInput: {
		width: 100,
		marginRight: 20
	},
	tabs: {
		backgroundColor: "#7986CB"
	}
};

const EditStructure = React.createClass({
	getInitialState: function() {
		return {
			structure: this.props.structure
		};
	},

	// strcuture style event handlers
	onStructureColorChange: function(color){
		var newStructure = Object.assign(this.state.structure);
		newStructure.backgroundColor = color;
		this.props.onStructureEdit(newStructure);
	},
	onStructureBackgroundImageChange: function(event){
		var newStructure = Object.assign(this.state.structure);
		newStructure.backgroundImage = event.target.value;
		this.props.onStructureEdit(newStructure);
	},

	// column styling event handlers
	updateColumn: function(index, key, value){
		var newStructure = Object.assign({}, this.state.structure),
			newColumns = this.state.structure.columns.reduce(function(accumulator, elem, i){
			if(index == i){
				if(key == "padding")
					elem.padding = parseInt(value);
				if(key == "borderWidth")
					elem.borderWidth = parseInt(value);
				if(key == "borderColor")
					elem.borderColor = value;
				if(key == "backgroundColor")
					elem.backgroundColor = value;
				if(key == "textAlign"){
					elem.textAlign = value;
				}
				accumulator.push(elem)
			}else{
				accumulator.push(elem);
			}
			return accumulator;
		}, []);
		newStructure.columns = newColumns;
		this.props.onStructureEdit(newStructure);
	},
	onPaddingChange: function(index, event){
		this.updateColumn(index, "padding", event.target.value);
	},
	onBorderWidthChange: function(index, event){
		this.updateColumn(index, "borderWidth", event.target.value);
	},
	handleAlignmentChange: function(index, value, event){
		this.updateColumn(index, "textAlign", value)
	},
	onBorderColorChange: function(color, index){
		this.updateColumn(index, "borderColor", color);
	},
	onColumnColorChange: function(color, index){
		this.updateColumn(index, "backgroundColor", color);
	},
	render: function(){
		const this1 = this;
		return (<div className="edit-structure">
					<TextField
				      floatingLabelText="Background Image"
				      hintText="http://www.example.com/image.jpg"
				      onChange={this1.onStructureBackgroundImageChange}
				      floatingLabelFixed={true}
				    />
				    <ColorPicker
				    	color={this1.state.structure.backgroundColor}
				    	columnIndex={0}
				    	buttonText="Background Color"
				    	onColorChange={this1.onStructureColorChange} />
			    	<Tabs>
			    		{this1.state.structure.columns.map(function(elem, index){
			    			return (<Tab label={"Column " + (index+1)}
			    							buttonStyle={styles.tabs}>
			    						<div>
											<TextField
										      floatingLabelText="Padding"
										      hintText="0"
										      type="number"
										      style={styles.numberInput}
										      onChange={this1.onPaddingChange.bind(null, index)}
										      floatingLabelFixed={true}
										    />
											<TextField
										      floatingLabelText="Border Width"
										      hintText="0"
										      style={styles.numberInput}
										      type="number"
										      onChange={this1.onBorderWidthChange.bind(null, index)}
										      floatingLabelFixed={true}
										    />
										    <br />
										    <IconButton onClick={this1.handleAlignmentChange.bind(null, index, "left")} tooltip="Left Align"><LeftAlignIcon /></IconButton>
										    <IconButton onClick={this1.handleAlignmentChange.bind(null, index, "right")} tooltip="Right Align"><RightAlignIcon /></IconButton>
										    <IconButton onClick={this1.handleAlignmentChange.bind(null, index, "center")} tooltip="Center Align"><CenterAlignIcon /></IconButton>
										    <IconButton onClick={this1.handleAlignmentChange.bind(null, index, "justify")} tooltip="Justify Align"><JustifyAlignIcon /></IconButton>
							    			<ColorPicker
										    	color={elem.borderColor}
										    	columnIndex={index}
										    	buttonText="Border Color"
										    	onColorChange={this1.onBorderColorChange} />
							    		
							    			<ColorPicker
										    	color={elem.backgroundColor}
										    	columnIndex={index}
										    	buttonText="Background Color"
										    	onColorChange={this1.onColumnColorChange} />
								        </div>
			    					</Tab>);
			    		})}
			    	</Tabs>
				</div>);
	}
});

export default EditStructure;
