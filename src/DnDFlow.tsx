import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import "@xyflow/react/dist/style.css";

import Sidebar from "./components/Sidebar";
import { DnDProvider } from "./context/DnDContext";
import PropertiesSidebar from "./components/PropertiesSidebar";
import { FlowCanvas } from "./components/FlowCanvas";
import { useNodeManager } from "./hooks/useNodeManager";
import {
  SubscriptionNode,
  ResourceGroupNode,
  VnetNode,
} from "./components/CustomNodes";

const nodeTypes = {
  subscription: SubscriptionNode,
  resourceGroup: ResourceGroupNode,
  vnet: VnetNode,
};

const DnDFlow = () => {
  const { selectedNode, setSelectedNode, nodes } = useNodeManager();

  // Keep selected node updated when nodes change
  useEffect(() => {
    if (selectedNode) {
      const updatedNode = nodes.find((node) => node.id === selectedNode.id);
      if (updatedNode) {
        setSelectedNode(updatedNode);
      } else {
        setSelectedNode(null);
      }
    }
  }, [nodes, selectedNode, setSelectedNode]);

  return (
    <div className="dndflow flex h-full flex-row">
      <Sidebar />
      <FlowCanvas nodeTypes={nodeTypes} />
      <PropertiesSidebar selectedNode={selectedNode} />
    </div>
  );
};

export default function WrappedDnDFlow() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
