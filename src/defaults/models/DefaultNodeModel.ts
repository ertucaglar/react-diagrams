import { DefaultPortModel } from "./DefaultPortModel";
import * as _ from "lodash";

import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";

/**
 * @author Dylan Vorster
 */
export class DefaultNodeModel extends NodeModel {
	name: string;
	color: string;
	ports: { [s: string]: DefaultPortModel };
	showAddNewButton: boolean;
	actionContainer: any;

	constructor(name: string = "Untitled", color: string = "rgb(0,192,255)", showAddNewButton: boolean = false, actionContainer?: any) {
		super("default");
		this.name = name;
		this.color = color;
		this.showAddNewButton = showAddNewButton;
		this.actionContainer = actionContainer;
	}

	addInPort(label: string, extras: any = {}): DefaultPortModel {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label, null, extras));
	}

	addOutPort(label: string, extras: any = {}): DefaultPortModel {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label, null, extras));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.color = object.color;
		this.showAddNewButton = object.showAddNewButton;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			color: this.color,
			showAddNewButton: this.showAddNewButton,
		});
	}

	getInPorts(): DefaultPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.in;
		});
	}

	getOutPorts(): DefaultPortModel[] {
		return _.filter(this.ports, portModel => {
			return !portModel.in;
		});
	}
}
