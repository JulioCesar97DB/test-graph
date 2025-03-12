import React, { createContext, useContext, ReactNode } from 'react';
import { useNodeManager } from '../hooks/useNodeManager';
import { CustomNode } from '../types';
import { OnNodesChange } from '@xyflow/react';

interface NodeContextType {
  nodes: CustomNode[];
  selectedNode: CustomNode | null;
  setSelectedNode: (node: CustomNode | null) => void;
  onNodeClick: (event: React.MouseEvent, node: CustomNode) => void;
  onNodesChange: OnNodesChange<CustomNode>;
  createNode: (type: string, event: React.DragEvent<HTMLDivElement>) => void;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export function NodeProvider({ children }: { children: ReactNode }) {
  const nodeManager = useNodeManager();
  
  return (
    <NodeContext.Provider value={nodeManager}>
      {children}
    </NodeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNodeContext() {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error('useNodeContext must be used within a NodeProvider');
  }
  return context;
}