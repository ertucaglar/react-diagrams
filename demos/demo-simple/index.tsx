import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DiagramWidget,
	DefaultLinkModel, BaseModel, PointModel, LabelModel, DefaultPortModel
} from "storm-react-diagrams";
import * as React from "react";
import { SimplePortFactory } from "../demo-custom-node1/SimplePortFactory";
import { DiamondPortModel } from "../demo-custom-node1/DiamondPortModel";
import { DiamondNodeFactory } from "../demo-custom-node1/DiamondNodeFactory";
import { DiamondNodeModel } from "../demo-custom-node1/DiamondNodeModel";
import { EntityPortModel } from "../../src/models/EntityPortModel";
import { EntityNodeFactory } from "../../src/models/EntityNodeFactory";
import { EntityNodeModel } from "../../src/models/EntityNodeModel";

export default () => {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();
	engine.registerPortFactory(new SimplePortFactory("entity", config => new EntityPortModel()));
	engine.registerNodeFactory(new EntityNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var list = [
		new DefaultPortModel(true, "category_name", "Kategori Adı"),
		new DefaultPortModel(true, "category_erp_code", "Erp Kodu"),
		new DefaultPortModel(false, "category_out", "Çıkış")
	];
	var node1 = new EntityNodeModel(list);
	node1.extras = {
		showAddNewButton: false
	};
	node1.setPosition(100, 100);
	//3-B) create another default node
	var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
	node2.portAlignment = "left";
	node2.addInPort("Category");
	node2.addInPort("Sub Category");
	node2.setPosition(400, 100);

	//4) add the models to the root graph
	model.addAll(node1, node2);

	//5) load model into engine
	engine.setDiagramModel(model);

	//6) render the diagram!
	return <DiagramWidget className="srd-demo-canvas" allowCanvasTranslation={false} allowCanvasZoom={false} diagramEngine={engine} itemSelected={(e) => {
		console.log(e);
	}} />;
};
