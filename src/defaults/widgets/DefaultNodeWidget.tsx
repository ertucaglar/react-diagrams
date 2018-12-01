import * as React from "react";
import * as _ from "lodash";
import { DefaultNodeModel } from "../models/DefaultNodeModel";
import { DefaultPortLabel } from "./DefaultPortLabelWidget";
import { DiagramEngine } from "../../DiagramEngine";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";

export interface DefaultNodeProps extends BaseWidgetProps {
	node: DefaultNodeModel;
	diagramEngine: DiagramEngine;
}

export interface DefaultNodeState {
	changed: boolean
}

/**
 * @author Dylan Vorster
 */
export class DefaultNodeWidget extends BaseWidget<DefaultNodeProps, DefaultNodeState> {
	constructor(props: DefaultNodeProps) {
		super("srd-default-node", props);
		this.state = {
			changed: false
		};
	}

	generatePort(port) {
		return <DefaultPortLabel removeCallback={this.reRender} model={port} key={port.id} />;
	}

	addNewPort = (node: DefaultNodeModel) => {
		const {changed} = this.state;
		const extras = {
			isNew: true
		};
		node.addInPort(`Giriş ${Object.keys(this.props.node.ports).length}`, extras);
		this.setState({changed: !changed})
	};

	reRender = () => {
		const {changed} = this.state;
		this.setState({changed: !changed})
	};

	render() {
		const {changed} = this.state;
		return (
			<div data-changed={changed} {...this.getProps()} style={{ background: this.props.node.color }}>
				<div className={this.bem("__title")}>
					<div className={this.bem("__name")}>{this.props.node.name}</div>
				</div>
				<div className={this.bem("__ports")}>
					<div className={this.bem("__in")}>
						{_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
					</div>
					<div className={this.bem("__out")}>
						{_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
					</div>
				</div>
				{this.props.node.showAddNewButton && <div className="enetity-node-actions">
					<span onClick={(event) => {this.addNewPort(this.props.node)}} className="add-new-button">Yeni Giriş Ekle</span>
				</div>}
			</div>
		);
	}
}
