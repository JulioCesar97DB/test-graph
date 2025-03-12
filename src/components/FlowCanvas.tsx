import { useRef, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  OnNodesChange,
  OnEdgesChange,
  NodeTypes,
  NodeMouseHandler,
} from '@xyflow/react';
import { useNodeContext } from '../context/NodeContext';
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
  } = useNodeContext();
  
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

  // Create a wrapper function for onNodeClick to ensure proper type handling
  const handleNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      console.log('Node clicked in FlowCanvas:', node);
      onNodeClick(event, node as CustomNode);
    },
    [onNodeClick]
  );

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
        onNodeClick={handleNodeClick}  // Use our wrapper function here
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