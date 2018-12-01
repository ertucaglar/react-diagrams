import * as React from "react";
import { DefaultPortModel } from "../models/DefaultPortModel";
import { PortWidget } from "../../widgets/PortWidget";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";

export interface DefaultPortLabelProps extends BaseWidgetProps {
	model: DefaultPortModel;
	removeCallback?: any;
}

export interface DefaultPortLabelState {
	changed: boolean;
}

/**
 * @author Dylan Vorster
 */
export class DefaultPortLabel extends BaseWidget<DefaultPortLabelProps, DefaultPortLabelState> {
	constructor(props) {
		super("srd-default-port", props);
		this.state = {
			changed: false
		}
	}

	getClassName() {
		return super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"));
	}

	deletePort = (model: DefaultPortModel) => {
		const {removeCallback} = this.props;
		Object.keys(model.links).forEach(key => {
			const link = model.links[key];
			link.remove();
		});
		model.parent.removePort(model);
		if (removeCallback) {
			removeCallback();
		}
	};

	render() {
		const {changed} = this.state;
		var port = <PortWidget node={this.props.model.getParent()} name={this.props.model.name} />;
		var label = <div className="name">{this.props.model.label}</div>;
		return (
			<div {...this.getProps()} data-changed={changed}>
				{this.props.model.in ? port : label}
				{this.props.model.in ? label : port}
				{(this.props.model.extras && this.props.model.extras.isNew) && <span className="remove-button" onClick={() => {this.deletePort(this.props.model)}}>X</span>}
			</div>
		);
	}
}
