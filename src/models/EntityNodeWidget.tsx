import * as React from "react";
import { DefaultPortLabel, DefaultPortModel, PortWidget } from "storm-react-diagrams";
import {EntityNodeModel} from "./EntityNodeModel";
import { debug } from "util";

export interface EntityNodeWidgetProps {
	node: EntityNodeModel;
	size?: number;
}

export interface EntityNodeWidgetState {
	changed: boolean
}

/**
 * @author Dylan Vorster
 */
export class EntityNodeWidget extends React.Component<EntityNodeWidgetProps, EntityNodeWidgetState> {
	public static defaultProps: EntityNodeWidgetProps = {
		size: 250,
		node: null
	};

	constructor(props: EntityNodeWidgetProps) {
		super(props);
		this.state = {
			changed: false
		};
	}

	addNewPort = (node: EntityNodeModel, name, index) => {
		const {changed} = this.state;
		node.addPort(new DefaultPortModel(true, name, `Giriş ${index}`));
		node.selected = false;
		this.setState({changed: !changed})
	};

	render() {
		const {changed} = this.state;
		var ports = [];
		var node = this.props.node;
		Object.keys(node.ports).forEach(key =>
			ports.push(node.ports[key])
		);
		return (
			<div
				data-nodeid={this.props.node.id}
				data-changed={changed}
				style={{
					top: this.props.node.y,
					left: this.props.node.x
				}}
			>
				<div style={{width: this.props.size, background: this.props.node.color}} className="entity-node">
					<h3>Title</h3>
					{
						ports.map(port => {
							return(<DefaultPortLabel key={`port_index_${port.name}`} model={port} />);
						})
					}
					{
						(node.extras && node.extras.showAddNewButton) && <div className="enetity-node-actions">
							<span onClick={(event) => {this.addNewPort(node, "port_" + ports.length, ports.length)}} className="add-new-button">Yeni Giriş Ekle</span>
						</div>
					}
				</div>
			</div>
		);
	}
}
