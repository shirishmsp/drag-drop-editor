import React from 'react';

import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import DuplicateIcon from 'material-ui/svg-icons/content/content-copy';

const styles = {
	buttonSettings: {
		height: 16,
		width: 16,
		padding: 0,
		marginRight: 5
	},
	iconSettings: {
		height: 16,
		width: 16,
		padding: 0,
	}
};

const EditableContentSettings = React.createClass({
	getInitialState: function(){
		return {
			clicked: false,
			backgroundColor: "white"
		};
	},
	handleEditElement: function(event){
        if(!this.state.clicked && quillInstance != null){
            this.props.openSnackbar("Save your previous changes before going on your next editing expedition!");
        }
        else{
            this.props.handleEditElement(event, this.props.contentType);
            this.setState({
                clicked: !this.state.clicked
            });
        }
	},
	render: function(){
		var editSaveIcon = <EditIcon color="#3F51B5"/>, editButton;
		if(this.state.clicked){
			editSaveIcon = <SaveIcon color="#3F51B5"/>;
		}
		if(this.props.handleEditElement != null){
			editButton = <IconButton 
							style={styles.buttonSettings}
							iconStyle={styles.iconSettings}
							onClick={this.handleEditElement} >
							{editSaveIcon}
						</IconButton>;
		}

		return (<div className={this.props.class}>
					<IconButton 
						style={styles.buttonSettings}
						iconStyle={styles.iconSettings}
						onClick={this.props.handleDeleteElement} >
						<DeleteIcon color="#c00" />
					</IconButton>
					<IconButton 
						style={styles.buttonSettings}
						iconStyle={styles.iconSettings}
						onClick={this.props.handleDuplicateElement} >
						<DuplicateIcon />
					</IconButton>
					{editButton}
				</div>);
	}
});

export default EditableContentSettings;
