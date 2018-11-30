import { DefaultPortModel, NodeModel } from "storm-react-diagrams";
import { EntityPortModel } from "./EntityPortModel";

export class EntityNodeModel extends NodeModel {
	color: string;
	constructor(props: Array<DefaultPortModel> = [], color: string = "rgb(0,192,255)") {
		super("entity");
		this.color = color;
		if (props != null) {
			props.forEach((prop, index) => {
				this.addPort(prop);
			});
		}
	}
}
