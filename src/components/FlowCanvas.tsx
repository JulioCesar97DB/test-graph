import { useRef, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  OnNodesChange,
  OnEdgesChange,
  NodeTypes,
} from '@xyflow/react';
import { useNodeManager } from '../hooks/useNodeManager';
import { useEdgeManager } from '../hooks/useEdgeManager';
import { useVnetConnections } from '../hooks/useVnetConnections';
import { useDnD } from '../context/DnDContext';
import { CustomNode } from '../types';

interface FlowCanvasProps {
  nodeTypes: NodeTypes;
}

export function FlowCanvas({ nodeTypes }: FlowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [type] = useDnD();
  
  const { 
    nodes, 
    onNodesChange, 
    onNodeClick,
    createNode 
  } = useNodeManager();
  
  const { 
    edges, 
    onEdgesChange, 
    onConnect 
  } = useEdgeManager();
  
  const { isValidVnetConnection } = useVnetConnections();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!type) return;
      createNode(type, event);
    },
    [createNode, type]
  );

  const nodeClassName = (node: CustomNode): string => node.type;

  return (
    <div className="flex flex-grow h-svh" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange as OnNodesChange}
        onEdgesChange={onEdgesChange as OnEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        isValidConnection={({ source, target }) => 
          (source && target) ? isValidVnetConnection(source, target) : false
        }
        fitView
        style={{ backgroundColor: "#F7F9FB" }}
      >
        <MiniMap zoomable pannable nodeClassName={nodeClassName} />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}