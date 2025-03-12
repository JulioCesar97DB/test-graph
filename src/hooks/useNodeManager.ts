import { useCallback, useState, useEffect } from 'react';
import { useNodesState, useReactFlow } from '@xyflow/react';
import { usePositionCalculator } from './usePositionCalculator';
import { CustomNode } from '../types';

let id = 0;
const getId = () => `dndnode_${id++}`;

export function useNodeManager() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const { screenToFlowPosition, getNodes } = useReactFlow<CustomNode>();
  const { getAbsolutePosition } = usePositionCalculator();

  useEffect(() => {
    if (selectedNode) {
      const updatedNode = nodes.find((node) => node.id === selectedNode.id);
      if (updatedNode && updatedNode !== selectedNode) {
        console.log('Updating selected node with latest state:', updatedNode);
        setSelectedNode(updatedNode);
      } else if (!updatedNode) {
        console.log('Selected node no longer exists, clearing selection');
        setSelectedNode(null);
      }
    }
  }, [nodes, selectedNode]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: CustomNode) => {
    event.preventDefault();
    console.log('Setting selected node in useNodeManager:', node);
    setSelectedNode(node);
  }, []);

  const createNode = useCallback(
    (type: string, event: React.DragEvent<HTMLDivElement>) => {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const currentNodes = getNodes();
      
      let width = 150;
      let height = 40;

      if (type === "subscription") {
        width = 300;
        height = 300;
      } else if (type === "resourceGroup") {
        width = 200;
        height = 200;
      }

      const newNode: CustomNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
        width,
        height,
      };

      if (type === "resourceGroup" || type === "vnet") {
        const parentType = type === "resourceGroup" ? "subscription" : "resourceGroup";
        const potentialParents = currentNodes.filter(
          (node) => node.type === parentType
        );

        let parentNode: CustomNode | null = null;
        
        for (const node of potentialParents) {
          const absolutePos = getAbsolutePosition(node, currentNodes);
          
          const isInside =
            position.x >= absolutePos.x &&
            position.x <= absolutePos.x + (node.width || 0) &&
            position.y >= absolutePos.y &&
            position.y <= absolutePos.y + (node.height || 0);

          if (isInside) {
            parentNode = node;
            break;
          }
        }

        if (!parentNode) {
          return;
        }

        newNode.parentId = parentNode.id;
        newNode.extent = "parent";

        const absoluteParentPos = getAbsolutePosition(parentNode, currentNodes);

        newNode.position = {
          x: position.x - absoluteParentPos.x,
          y: position.y - absoluteParentPos.y,
        };

        const margin = 10;
        const maxX = (parentNode.width || 0) - width - margin;
        const maxY = (parentNode.height || 0) - height - margin;

        if (maxX < margin || maxY < margin) {
          return;
        }

        if (newNode.position.x < margin) newNode.position.x = margin;
        if (newNode.position.y < margin) newNode.position.y = margin;
        if (newNode.position.x > maxX) newNode.position.x = maxX;
        if (newNode.position.y > maxY) newNode.position.y = maxY;
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [getAbsolutePosition, getNodes, screenToFlowPosition, setNodes]
  );

  return {
    nodes,
    setNodes,
    onNodesChange,
    selectedNode,
    setSelectedNode,
    onNodeClick,
    createNode
  };
}