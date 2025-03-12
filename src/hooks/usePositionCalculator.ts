import { useCallback } from 'react';
import { XYPosition } from '@xyflow/react';
import { CustomNode } from '../types';


export function usePositionCalculator() {
  const getAbsolutePosition = useCallback(
    (node: CustomNode, allNodes: CustomNode[]): XYPosition => {
      let x = node.position.x;
      let y = node.position.y;

      if (node.parentId) {
        const parentNode = allNodes.find((n) => n.id === node.parentId);
        if (parentNode) {
          const parentPos = getAbsolutePosition(parentNode, allNodes);
          x += parentPos.x;
          y += parentPos.y;
        }
      }

      return { x, y };
    },
    []
  );

  return { getAbsolutePosition };
}