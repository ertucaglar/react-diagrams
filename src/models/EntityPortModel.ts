import * as _ from "lodash";
import { LinkModel, DiagramEngine, PortModel, DefaultLinkModel } from "storm-react-diagrams";

export class EntityPortModel extends PortModel {
	position: string | "left" | "right";
	extras: {};
	title: string;

	constructor(title: string = "", pos: string = "left", extras: {} = {}) {
		super(pos, "entity");
		this.position = pos;
		this.extras = extras;
		this.title = title;
	}

	serialize() {
		return _.merge(super.serialize(), {
			position: this.position,
			extras: this.extras,
			title: this.title
		});
	}

	deSerialize(data: any, engine: DiagramEngine) {
		super.deSerialize(data, engine);
		this.position = data.position;
		this.extras = data.extras;
		this.title = data.title;
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}
