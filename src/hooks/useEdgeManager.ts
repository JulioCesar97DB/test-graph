import { useCallback } from 'react';
import { useEdgesState, Connection, Edge } from '@xyflow/react';
import { useVnetConnections } from './useVnetConnections';

export function useEdgeManager() {
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { createConnection } = useVnetConnections();
  
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => createConnection(params, eds));
    },
    [createConnection, setEdges]
  );

  return {
    edges,
    setEdges,
    onEdgesChange,
    onConnect
  };
}