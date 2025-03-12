import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import { DnDProvider } from "./context/DnDContext";
import PropertiesSidebar from "./components/PropertiesSidebar";
import { FlowCanvas } from "./components/FlowCanvas";
import { NodeProvider, useNodeContext } from "./context/NodeContext";
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
  const { selectedNode } = useNodeContext();
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    console.log('Selected node in DnDFlow:', selectedNode);
    setRefreshKey(prev => prev + 1);
  }, [selectedNode]);

  return (
    <div className="dndflow flex h-full flex-row">
      <Sidebar />
      <FlowCanvas nodeTypes={nodeTypes} />
      <PropertiesSidebar key={refreshKey} selectedNode={selectedNode} />
    </div>
  );
};

export default function WrappedDnDFlow() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <NodeProvider>
          <DnDFlow />
        </NodeProvider>
      </DnDProvider>
    </ReactFlowProvider>
  );
}
