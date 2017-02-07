import React from 'react';
import Editor from './editor';
import EditorComponents from './editor-components';

// material ui component
import AppBar from 'material-ui/AppBar';

require('../../scss/style.scss');

const styles = {
	appBar: {
		position: "fixed",
		top: 0,
		left: 0
	}
}

const App = () => (
    <div>
    	<AppBar
    		title="DragDrop"
    		style={styles.appBar}
    		showMenuIconButton={false}
    	/>
        <Editor />
        <EditorComponents />
    </div>
);

export default App;
