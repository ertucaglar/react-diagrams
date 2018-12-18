import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DiagramWidget,
	DefaultLinkModel, BaseModel, PointModel, LabelModel, DefaultPortModel
} from "storm-react-diagrams";
import * as React from "react";

export default () => {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
	let port1 = node1.addOutPort("Out");
	node1.setPosition(100, 100);

	const SettingView = (a) => {
		return(
			<div>
			<span onClick={() => {
				model.clearSelection();
				engine.zoomToFit();
				console.log(a);
			}}>A</span>
				<span onClick={() => {
					model.removeNode(a);
					engine.zoomToFit();
				}}>B</span>
			</div>
		);
	};
	//3-B) create another default node
	var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)", true);
	node2.actionContainer = SettingView(node2);
	let port2 = node2.addInPort("In");
	node2.setPosition(400, 100);

	// link the ports
	let link1 = port1.link(port2);

	//4) add the models to the root graph
	model.addAll(node1, node2, link1);
	//5) load model into engine
	model.addListener({
		nodesUpdated: () => {
			debugger
		},
		linksUpdated: (e) => {
			if (e.link && e.link.targetPort && (e.link.targetPort as DefaultPortModel).extras && (e.link.targetPort as DefaultPortModel).extras.isNew) {
			engine.zoomToFit();
			}
		},
	});
	engine.setDiagramModel(model);

	//6) render the diagram!
	return <DiagramWidget allowCanvasZoom={false} className="srd-demo-canvas" diagramEngine={engine} itemSelected={(e) => {
		console.log(e);
	}} />;
};
