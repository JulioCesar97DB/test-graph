import { Node } from '@xyflow/react';

export interface CustomNode extends Node {
  width?: number;
  height?: number;
  parentId?: string;
  type: string;
}