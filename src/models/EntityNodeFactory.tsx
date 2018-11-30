import * as SRD from "storm-react-diagrams";
import * as React from "react";
import { EntityNodeModel } from "./EntityNodeModel";
import { EntityNodeWidget } from "./EntityNodeWidget";

export class EntityNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("entity");
	}

	generateReactWidget(diagramEngine: SRD.DiagramEngine, node: EntityNodeModel): JSX.Element {
		return <EntityNodeWidget node={node} />;
	}

	getNewInstance() {
		return new EntityNodeModel();
	}
}
