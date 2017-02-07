import React from 'react';

const style = {
	padding: 10
}

const Structure = React.createClass({
	getInitialState: function() {
		return {
			structures: [
				1,
				2,
				3,
				4
			]
		}	
	},
	onDragStart: function(structure, event) {
		event.dataTransfer.setData("text/plain", "structure&#" + structure);
	},
	renderStructure: function(structure, index){
		var content = [];
		for(var i=0; i<structure; i++){
			content.push(<td key={"structure-table-samples-td-" + index + "-" + i}></td>);
		}
		return (<table 
					className="structure-table-samples"
					key={"structure-table-samples-" + index}
					draggable={true}
					onDragStart={this.onDragStart.bind(null, structure)}>
						<tbody>
							<tr>{content}</tr>
						</tbody>
					</table>);
	},
	render: function(){
		const this1 = this;
		return (<div className="extern-row" style={style}>
					{this1.state.structures.map(function(structure, index){
						return this1.renderStructure(structure, index);
					})}
				</div>);
	}
});

export default Structure;
