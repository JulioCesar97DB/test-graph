import { useCallback } from 'react';
import { Connection, useReactFlow, Edge, addEdge } from '@xyflow/react';
import { CustomNode } from '../types';

export function useVnetConnections() {
  const { getNodes } = useReactFlow<CustomNode>();
  
  const isValidVnetConnection = useCallback(
    (sourceId: string | null, targetId: string | null): boolean => {
      if (!sourceId || !targetId) return false;
      
      const nodes = getNodes();
      const sourceNode = nodes.find((node) => node.id === sourceId);
      const targetNode = nodes.find((node) => node.id === targetId);
      
      return (
        sourceNode?.type === 'vnet' && 
        targetNode?.type === 'vnet' &&
        sourceNode.parentId === targetNode.parentId &&
        sourceNode.parentId !== undefined
      );
    },
    [getNodes]
  );

  const createConnection = useCallback(
    (params: Connection, edges: Edge[]) => {
      const nodes = getNodes();
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);
      
      if (sourceNode?.type === 'vnet' && targetNode?.type === 'vnet') {
        if (sourceNode.parentId === targetNode.parentId) {
          return addEdge({
            ...params,
            animated: true,
            style: { stroke: '#0078D4', strokeWidth: 2 },
            label: 'VNet Connection'
          }, edges);
        } else {
          console.log("Cannot connect VNet nodes from different Resource Groups");
          return edges;
        }
      }
      
      return addEdge(params, edges);
    },
    [getNodes]
  );

  return {
    isValidVnetConnection,
    createConnection
  };
}