import React from 'react';
import Text from './text-component';
import Image from './image-component';
import Button from './button-component';
import HorizontalLine from './horizontal-line-component';

const styles = {
	mainDiv: {
		paddingTop: 10,
		paddingRight: 10,
	},
	icon: {
		height: 64,
		width: 64,
		color: "#9FA8DA"
	},
	div: {
		border: "1px solid #C5CAE9",
		padding: 20,
		margin: 10,
		marginTop: 0,
		marginRight: 0,
		width: 72,
		color: "#5C6BC0",
		paddingBottom: 0,
		textAlign: "center",
		background: "#E8EAF6",
		cursor: "pointer"
	}
}

const ContentComponent = React.createClass({
	onDragStart: function(componentType, event) {
		event.dataTransfer.setData("text/plain", "content&#" + componentType);
	},
	render: function(){
		return (<table style={styles.mainDiv} className="extern-row">
					<tbody>
						<tr>
							<td>
								<Text 
									onDragStart={this.onDragStart}
									styles={styles}
								/>
							</td>
							<td>
								<Image 
									onDragStart={this.onDragStart}
									styles={styles}
								/>
							</td>
							<td>
								<Button 
									onDragStart={this.onDragStart}
									styles={styles}
								/>
							</td>
						</tr>
						<tr>
							<td>
								<HorizontalLine
									onDragStart={this.onDragStart}
									styles={styles}
								/>
							</td>
						</tr>
					</tbody>
				</table>);
	}
});

export default ContentComponent;
