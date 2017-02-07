import React from 'react';
var ClipboardButton = require('react-clipboard.js');

// material ui components
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const OutputDialog = React.createClass({
		
	handleClose: function(){
		this.props.closeOutputDialog();
	},
	render: function(){
		const actions = [
	      <ClipboardButton className="clipboard-copy-button" data-clipboard-text={this.props.emailTemplate}>
	        Copy to Clipboard
	      </ClipboardButton>
	    ];
		return (<Dialog
		          title="Email HTML Content"
		          actions={actions}
		          modal={false}
		          open={this.props.open}
		          onRequestClose={this.handleClose}
		        >
		          <TextField
				      hintText="Email Template"
				      multiLine={true}
				      rows={2}
				      id="emailTemplate"
				      fullWidth={true}
				      rowsMax={10}
				      onChange={this.props.changeEmailTemplateHTML.bind(null, event)}
				      defaultValue={this.props.emailTemplate}
				    />
		        </Dialog>);
	}
});

export default OutputDialog;