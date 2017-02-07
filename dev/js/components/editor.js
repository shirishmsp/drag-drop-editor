import React from 'react';
import Quill from 'quill';

require('../../scss/snow.scss');
// material ui components
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import DuplicateIcon from 'material-ui/svg-icons/content/content-copy';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SaveIcon from 'material-ui/svg-icons/content/save';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

// importing edit content and structure element
// import EditableContentSettings from './editor_components/editable-content-settings';
import EditStructure from './editor_components/edit-structure';
import EditImage from './editor_components/edit-image';
import EditButton from './editor_components/edit-button';
import ColorPicker from './editor_components/color-picker';
import OutputDialog from './editor_components/output-dialog';

require('quill');
for (var i=1e6, lookupTable=[]; i--;) {
  lookupTable.push(Math.random()*101|0);
}
function lookup() {
  return ++i >= lookupTable.length ? lookupTable[i=0] : lookupTable[i];
}

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
	},
	closeButton: {
		height: 16,
		width: 16,
		padding: 0,
		marginRight: 5,
		position: "absolute",
		top: 5,
		right: 5
	},
	closeButtonIcon: {
		height: 16,
		width: 16,
		padding: 0,
	},
	mainStyle: {
		backgroundColor: "white"
	}
}, toolbarOptions = [
                      ['bold', 'italic', 'underline', 'strike'],
                      ['link'],

                      [{ 'header': 1 }, { 'header': 2 }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'indent': '-1'}, { 'indent': '+1' }],

                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'font': [] }],
                      [{ 'align': [] }]
                    ];
var quillInstance = null;

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


const Editor = React.createClass({
	getInitialState: function() {
		return {
			structures: [
					{
						columns: [
							{
								contents: [
								<div className="editable-content-wrapper">
									<div className='editable-content editable-content-text'>
										<p>New Content</p>
									</div>
									<EditableContentSettings 
										class="content-settings"
										contentType="text"
										handleDuplicateElement={this.handleDuplicateElement}
										handleDeleteElement={this.handleDeleteElement}
										handleEditElement={this.handleEditElement}
                                        openSnackbar={this.openSnackbar} />
								</div>],
								key: 1,
								backgroundColor: null,
								borderColor: null,
								borderWidth: null,
								padding: null,
								textAlign: null
							}
						],
						key: 1,
						backgroundImage: null,
						backgroundColor: null
					}
				],
            snackbarOpen: false,
            snackbarMessage : "hurray",
            structureToBeEdited: null,
            columnToBeEdited: null,
            contentToBeEdited: null,
            imageToBeEdited: false,
            buttonToBeEdited: false,
            outputDialogOpen: false,
            emailTemplateHTML: ""
		};
	},
    openSnackbar: function(snackbarMessage){
        this.setState({
            snackbarOpen: true,
            snackbarMessage: snackbarMessage
        });
    },
    changeEmailTemplateHTML: function(event){
    	this.setState({
    		emailTemplateHTML: event.target.value
    	});
    },
	appendNewStructure: function(dataValue){
		const noColumns = parseInt(dataValue);
		var columnsContent = [],
			newContent = {};
		for(var i=0; i<noColumns; i++){
			columnsContent.push({
				contents: null,
				key: lookup(),
				backgroundColor: null,
				borderColor: null,
				borderWidth: null,
				padding: null,
				textAlign: null
			});
		}
		newContent = {
						columns: columnsContent,
						key: lookup(),
						backgroundColor: null,
						backgroundImage: null
					};
		this.setState({
			structures: this.state.structures.concat(newContent)
		});
	},
	getCurrentElementIndex: function(event){
		var contentWrapper = event.target.closest(".editable-content-wrapper"),
			contentParent = event.target.closest(".content-component");
		var contentComponents = contentParent.getElementsByClassName("editable-content-wrapper");
		return {
					index: Array.prototype.slice.call(contentComponents).indexOf(contentWrapper),
					uniqueClass: contentParent.className.split(" ")[0]
				};
	},
    resetQuillEditor: function(){
        quillInstance = null;
        var qlToolbar = document.getElementsByClassName("ql-toolbar")[0],
            qlClipboard = document.getElementsByClassName("ql-clipboard")[0],
            qlTooltip = document.getElementsByClassName("ql-tooltip")[0],
            qlContainer = document.getElementsByClassName("ql-container")[0],
            alignedElements, alignments = ["center", "left", "right", "justify"],
            i, singleAlignedElement, originalStyle;

        qlTooltip.parentNode.removeChild(qlTooltip);
        qlToolbar.parentNode.removeChild(qlToolbar);
        qlClipboard.parentNode.removeChild(qlClipboard);
        qlContainer.className = "editable-content editable-content-text";
        alignments.map(function(alignmentElem){
        	alignedElements = qlContainer.getElementsByClassName("ql-align-" + alignmentElem);
        	for(i = 0; i < alignedElements.length; i++){
        		singleAlignedElement = alignedElements.item(i);
        		originalStyle = singleAlignedElement.getAttribute("style") || "";

        		singleAlignedElement.setAttribute("style", originalStyle + "text-align: " + alignmentElem);
        	}
        });
        qlContainer.innerHTML = qlContainer.getElementsByClassName("ql-editor")[0].innerHTML;

    },
    handleEditElement: function(event, contentType){

        var currentElementIndex = this.getCurrentElementIndex(event),
            this1 = this,
            structureIndex, columnIndex, itemIndex, newStructureContent, newColumnContent;
        structureIndex = currentElementIndex.uniqueClass.split("-");
        columnIndex = parseInt(structureIndex[3]);
        structureIndex = parseInt(structureIndex[2]);
        itemIndex = parseInt(currentElementIndex.index);
    	var editableContent = event.target.closest(".editable-content-wrapper").getElementsByClassName("editable-content")[0];
    	if(contentType == "image"){
    		this.setState({
				imageToBeEdited: true,
				buttonToBeEdited: false,
				structureToBeEdited: structureIndex,
				columnToBeEdited: columnIndex,
				contentToBeEdited: itemIndex,
				editableContent: editableContent.childNodes[0]
			});
    	}
    	else if(contentType == "button"){
    		this.setState({
				buttonToBeEdited: true,
				imageToBeEdited: false,
				structureToBeEdited: structureIndex,
				columnToBeEdited: columnIndex,
				contentToBeEdited: itemIndex,
				editableContent: editableContent.childNodes[0]
			});
    	}
        else if(!quillInstance && contentType == "text"){
              quillInstance = new Quill(editableContent, {
              modules: {
                toolbar: toolbarOptions
              },
              theme: 'snow' 
            });
        }
        else{
            const editedHtmlContent = event.target.closest(".editable-content-wrapper").getElementsByClassName("ql-editor")[0].innerHTML;
            newColumnContent = this1.state.structures[structureIndex]
                                            .columns[columnIndex]
                                            .contents.reduce(function(accumulator, elem, index){
                                                            if(index != itemIndex){
                                                                return accumulator.concat(elem);
                                                            }
                                                            else{
                                                                return accumulator.concat(this1.getNewContent("text", editedHtmlContent));
                                                            }
                                                        }, []);

            this.resetQuillEditor();
            this.updateStructures(newColumnContent, this1, structureIndex, columnIndex);
        }
    },
	handleDuplicateElement: function(event){
		var currentElementIndex = this.getCurrentElementIndex(event),
			this1 = this,
			structureIndex, columnIndex, itemIndex, newStructureContent, newColumnContent;
		structureIndex = currentElementIndex.uniqueClass.split("-");
		columnIndex = parseInt(structureIndex[3]);
		structureIndex = parseInt(structureIndex[2]);
		itemIndex = parseInt(currentElementIndex.index);
		newColumnContent = this1.state.structures[structureIndex]
										.columns[columnIndex]
										.contents.reduce(function(accumulator, elem, index){
														if(index != itemIndex){
															return accumulator.concat(elem);
														}
														else{
															accumulator = accumulator.concat(elem);
															return accumulator.concat(elem);
														}
													}, []);
		
		this.updateStructures(newColumnContent, this1, structureIndex, columnIndex);
	},
	handleDeleteElement: function(event){
		var currentElementIndex = this.getCurrentElementIndex(event),
			this1 = this,
			structureIndex, columnIndex, itemIndex, newStructureContent, newColumnContent;
		structureIndex = currentElementIndex.uniqueClass.split("-");
		columnIndex = parseInt(structureIndex[3]);
		structureIndex = parseInt(structureIndex[2]);
		itemIndex = parseInt(currentElementIndex.index);
		newColumnContent = this1.state.structures[structureIndex]
										.columns[columnIndex]
										.contents.filter(function(elem, index){
														if(index != itemIndex){
															return elem;
														}
													});
		if(newColumnContent.length == 0){
			newColumnContent = null;
		}
		
		this.updateStructures(newColumnContent, this1, structureIndex, columnIndex);
	},
	getNewContent: function(contentType, contentData){
		var content = contentData || "<p>This is a sample text.</p>",
			tempHandleEditElement = this.handleEditElement;
		if(contentType == "image"){
			content = contentData || "<img src='default-placeholder.png' height='100px' />";
		}
		else if(contentType == "button"){
			content = contentData || "<button>Button</button>";
		}
		else if(contentType == "line"){
			content = contentData || "<hr />";
			tempHandleEditElement = null;
		}
		content = {__html: content};
		return (<div 
					className="editable-content-wrapper">
					<div 
                        className={'editable-content editable-content-' + contentType}
                        dangerouslySetInnerHTML={content}>
					</div>
					<EditableContentSettings 
						class="content-settings"
						contentType={contentType}
						handleDuplicateElement={this.handleDuplicateElement}
						handleDeleteElement={this.handleDeleteElement}
                        handleEditElement={tempHandleEditElement}
                        openSnackbar={this.openSnackbar} />
				</div>);
	},
	appendNewContent: function(event, this1, dataValue){
		let closestDiv = event.target.closest(".content-component").classList[0].split("-"),
			structureIndex = parseInt(closestDiv[2]),
			columnIndex = parseInt(closestDiv[3]),
			getNewContent = this.getNewContent(dataValue),
			newColumnContent, newStructureContent;

		if(this1.state.structures[structureIndex].columns[columnIndex].contents)
			newColumnContent = this1.state.structures[structureIndex].columns[columnIndex].contents.concat(getNewContent);
		else
			newColumnContent = [getNewContent];

		this.updateStructures(newColumnContent, this1, structureIndex, columnIndex);
	},
	updateStructures: function(newColumnContent, this1, structureIndex, columnIndex){
		var newStructureContent = this1.state.structures.map(function(structure, tempStructureIndex){
			if(tempStructureIndex == structureIndex){
				let tempColumnContent = []
				tempColumnContent = this1.state.structures[structureIndex].columns.map(function(column, tempColumnIndex){
					const val = this1.state.structures[structureIndex].columns[columnIndex];
					if(tempColumnIndex == columnIndex){
						return {
							contents: newColumnContent,
							key: val.key,
							backgroundColor: val.backgroundColor,
							borderColor: val.borderColor,
							borderWidth: val.borderWidth,
							padding: val.padding,
							textAlign: val.textAlign
						};
					}
					else{
						return column;
					}
				});
				const val = this1.state.structures[structureIndex];
				return {
							columns: tempColumnContent,
							key: val.key,
							backgroundColor: val.backgroundColor,
							backgroundImage: val.backgroundImage,
						};
			}
			else{
				return structure;
			}
		});

		this.setState({
			structures: newStructureContent
		})
	},
	onDropStructure: function(randKey, event){
		const newData = event.dataTransfer.getData("text"),
				dataType = newData.split("&#")[0],
				dataValue = newData.split("&#")[1];

		if(dataType == "structure"){
			this.appendNewStructure(dataValue);
		}
		if(dataType == "content"){
			this.appendNewContent(event, this, dataValue);
		}
	},
	handleDuplicateStructure: function(event){
		var currentStructureIndex = parseInt(event.target.closest(".structure-wrapper").getElementsByClassName("structure-table")[0].className.split(" ")[1].split("-")[2]),
			newStructure;

		newStructure = this.state.structures.reduce(function(accumulator, elem, index){
														if(index == currentStructureIndex){
															accumulator.push(elem);
															accumulator.push(elem);
														}
														else{
															accumulator.push(elem);
														}
														return accumulator;
													}, []);
		this.setState({
			structures: newStructure
		});

	},
	handleDeleteStructure: function(event){
		var currentStructureIndex = parseInt(event.target.closest(".structure-wrapper").getElementsByClassName("structure-table")[0].className.split(" ")[1].split("-")[2]),
			newStructure;

		if(this.state.structures.length == 1){
			this.setState({
				snackbarOpen: true,
				snackbarMessage: "You cannot delete the last structure!"
			});
			return;
		}
		newStructure = this.state.structures.reduce(function(accumulator, elem, index){
			if(index != currentStructureIndex){
				accumulator.push(elem);
			}
			return accumulator;
		}, []);
		this.setState({
			structures: newStructure
		});
	},
	handleEditStructure: function(event){
		var currentStructureIndex = parseInt(event.target.closest(".structure-wrapper").getElementsByClassName("structure-table")[0].className.split(" ")[1].split("-")[2]);
		this.setState({
			structureToBeEdited: currentStructureIndex,
            columnToBeEdited: null,
            contentToBeEdited: null,
		});
	},
	onStructureEdit: function(newStructure){
		var this1 = this,
			newStructures;
		newStructures = this.state.structures.reduce(function(accumulator, elem, index){
			if(index == this1.state.structureToBeEdited){
				accumulator.push(newStructure);
			}
			else{
				accumulator.push(elem);
			}
			return accumulator;
		}, []);
		this.setState({
			structures: newStructures
		})
	},
    onContentEdit: function(newContent){
    	var newColumnContent,
    		this1 = this,
    		contentType = this.state.imageToBeEdited ? "image" : "button",
    		contentWrapper = (<div className="editable-content-wrapper">
								<div className={'editable-content editable-content-' + contentType}>
									{newContent}
								</div>
								<EditableContentSettings 
									class="content-settings"
									contentType={contentType}
									handleDuplicateElement={this1.handleDuplicateElement}
									handleDeleteElement={this1.handleDeleteElement}
									handleEditElement={this1.handleEditElement}
                                    openSnackbar={this1.openSnackbar} />
							</div>);

    	newColumnContent = this1.state.structures[this1.state.structureToBeEdited]
										.columns[this1.state.columnToBeEdited]
										.contents.reduce(function(accumulator, elem, index){
														if(index != this1.state.contentToBeEdited){
															return accumulator.concat(elem);
														}
														else{
															return accumulator.concat(contentWrapper);
														}
													}, []);
		this.updateStructures(newColumnContent, this1, this1.state.structureToBeEdited, this1.state.columnToBeEdited);
    },
    closeEdit: function(){
    	this.setState({
            structureToBeEdited: null,
            columnToBeEdited: null,
            contentToBeEdited: null,
            imageToBeEdited: false,
            buttonToBeEdited: false
    	});
    },
	renderStructure: function(structure, structureIndex){
		const this1 = this,
			randKey = structure.key;
		var content = [],
			newStyle = {
				width: "640px"
			};
		structure.columns.map(function(column, columnIndex){
			content.push(this1.renderColumn(column, columnIndex, structureIndex));
		});
		if(structure.backgroundColor != null){
			newStyle.backgroundColor = structure.backgroundColor;
		}
		if(structure.backgroundImage != null){
			newStyle.backgroundImage = "url('" + structure.backgroundImage + "')";
		}

		return (<div className="structure-wrapper" key={"structure-wrapper-" + structureIndex}>
					<table 
						className={"structure-table structure-index-" + structureIndex} 
						key={"table-" + randKey}
						onDrop={this1.onDropStructure.bind(null, randKey)}
						style={newStyle}>
						<tbody>
							<tr>{content}</tr>
						</tbody>
					</table>
					<EditableContentSettings 
						class="structure-settings"
						handleDuplicateElement={this.handleDuplicateStructure}
						handleDeleteElement={this.handleDeleteStructure}
						handleEditElement={this.handleEditStructure}
                        openSnackbar={this.openSnackbar} />
                </div>);
	},
	renderColumn: function(column, columnIndex, structureIndex){
		const this1 = this;
		var content,
			newStyle = {};

		if(column.backgroundColor != null){
			newStyle.backgroundColor = column.backgroundColor;
		}
		if(column.borderColor != null){
			newStyle.borderColor = column.borderColor;
			newStyle.borderStyle = "solid";
		}
		if(column.borderWidth != null){
			newStyle.borderWidth = column.borderWidth;
		}
		if(column.padding != null){
			newStyle.padding = column.padding;
		}
		if(column.textAlign != null){
			newStyle.textAlign = column.textAlign;
		}
		if(column.contents){
			content = column.contents;
		}
		else{
			content = <div className="component-placeholder">Drag and drop a content or structure</div>;
		}
		return <td 
					className={"content-index-" + structureIndex + "-" + columnIndex + " content-component"}
					onDrop={this1.onDropStructure.bind(null, column.key)} 
					key={"column-" + column.key}
					style={newStyle}>
						{content}
				</td>;
	},
    componentDidUpdate: function(prevProps, prevState) {
        console.log("component updated");
    },
    saveTemplate: function(){
    	var templateContent = "", tempTableStyle, tempColumnStyle, tempColumnElement, originalStyle;

		Array.prototype.slice.call(document.getElementsByClassName("structure-table")).map(function(elem){
			tempTableStyle = elem.getAttribute("style");
			templateContent += "<table style='"+ tempTableStyle +"'><tbody><tr>";
			Array.prototype.slice.call(elem.getElementsByClassName("content-component")).map(function(el){
				tempColumnStyle = el.getAttribute("style");
				templateContent += "<td style='"+ tempColumnStyle +"'>";
				Array.prototype.slice.call(el.getElementsByClassName("editable-content")).map(function(e){
					tempColumnElement = e.childNodes[0];
					if(tempColumnElement.hasAttribute("data-href") && tempColumnElement.getAttribute("data-href") != ""){
						templateContent += "<a href=\"" + tempColumnElement.getAttribute("data-href") + "\">" + e.innerHTML + "</a>";
					}
					else{
						templateContent += e.innerHTML;
					}
				});
				templateContent += "</td>";
			});
			templateContent += "</tr></tbody></table>";
		});
		templateContent = '<html><head></head><body style="margin:0; padding:0;"><div class="bgContainer" style="margin: 0 auto; padding: 0; width: 100%; background-color: #eee;"><br clear="all"><div class="mailContainer" style="width: 640px; margin: 10px auto;  font-size: 13px; color: #333; font-family: arial; line-height: 18px;">' + templateContent + '</div></div></body></html>';
		this.setState({
			outputDialogOpen: true,
			emailTemplateHTML: templateContent
		});
    },   
    closeOutputDialog: function(){
    	this.setState({
    		outputDialogOpen: false,
    	});
    },
    onBackgroundColorChange: function(color){
    	this.setState({
    		backgroundColor: color
    	});
    	styles.mainStyle.backgroundColor = color;
    },
	render: function(){
		var content = [],
			this1 = this,
			editContent, editStructure, hide = "hide";

		styles.mainStyle.backgroundColor = this.state.backgroundColor;
		this1.state.structures.map(function(structure, structureIndex){
			content.push(this1.renderStructure(structure, structureIndex));
		});
		if(this.state.structureToBeEdited != null && this.state.contentToBeEdited == null){
			hide = "";
			editStructure = <EditStructure
								structure={this.state.structures[this.state.structureToBeEdited]}
								onStructureEdit={this.onStructureEdit} />
		}
		if(this.state.columnToBeEdited != null && this.state.contentToBeEdited != null){
			hide = ""
			if(this.state.imageToBeEdited)
				editContent = <EditImage
								content={this.state.editableContent}
								onContentEdit={this.onContentEdit} />
			else
				editContent = <EditButton
								content={this.state.editableContent}
								onContentEdit={this.onContentEdit} />
		}
		return (<div>
                    <div className="main-template-div" style={styles.mainStyle}>
                    	<div className="template-div">
	                    	<IconButton 
								style={styles.closeButton}
								iconStyle={styles.closeButtonIcon}
								onClick={this.saveTemplate} >
								<SaveIcon />
							</IconButton>
                    		{content}
							<ColorPicker
						    	columnIndex={0}
						    	color={this.state.backgroundColor}
						    	buttonText="Body Background Color"
						    	onColorChange={this1.onBackgroundColorChange} />
                    	</div>
                    </div>
                    <div className={"edit-components " + hide}>
                		{editContent}
                		{editStructure}
                    	<IconButton 
							style={styles.closeButton}
							iconStyle={styles.closeButtonIcon}
							onClick={this.closeEdit} >
							<CloseIcon />
						</IconButton>
                    </div>
                    <Snackbar
                      open={this.state.snackbarOpen}
                      message={this.state.snackbarMessage}
                      autoHideDuration={4000}
                    />
                    <OutputDialog 
                    	open={this.state.outputDialogOpen}
                    	emailTemplate={this.state.emailTemplateHTML}
                    	closeOutputDialog={this.closeOutputDialog}
                    	changeEmailTemplateHTML={this.changeEmailTemplateHTML} />
                </div>);
	}
});

export default Editor;
