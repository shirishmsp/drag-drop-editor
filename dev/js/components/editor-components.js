import React from 'react';

import Structure from './editor_components/structure';
import ContentComponents from './editor_components/content_components';

import ContentIcon from 'material-ui/svg-icons/action/dashboard';
import StructureIcon from 'material-ui/svg-icons/action/view-column';

// material ui components
import {Tabs, Tab} from 'material-ui/Tabs';

const EditorComponents = React.createClass({
	render: function(){
		return (<div className="editor-components">
					<Tabs>
                        <Tab
                            icon={<ContentIcon />} 
                            label="Content" >
                            <ContentComponents />
                        </Tab>
                        <Tab
                            icon={<StructureIcon />}  
                            label="Structure" >
                            <Structure />
                        </Tab>
                    </Tabs>
				</div>);
	}
});

export default EditorComponents;
