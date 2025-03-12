import { memo, useCallback } from 'react';
import { NodeProps, Handle, Position, NodeResizeControl, useReactFlow, ResizeParams } from "@xyflow/react";

interface CustomNodeProps extends NodeProps {
  id: string;
  data: {
    label: string;
    [key: string]: unknown;
  };
}

const controlStyle = {
  background: 'transparent',
  border: 'none',
};

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export const SubscriptionNode = memo(({ id, data }: CustomNodeProps) => {
  const { setNodes } = useReactFlow();
  
  const onResize = useCallback((_: React.MouseEvent, params: ResizeParams) => {
    const { width, height } = params;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            style: {
              ...node.style,
              width,
              height,
            },
          };
        }
        return node;
      })
    );
  }, [id, setNodes]);
  
  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={200} minHeight={200} onResize={() => onResize}>
        <ResizeIcon />
      </NodeResizeControl>
      
      <div style={{ 
        backgroundColor: 'rgba(0, 200, 0, 0.2)', 
        border: '1px solid rgba(0, 200, 0, 0.5)',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        padding: '10px'
      }}>
        <div>{data.label}</div>
      </div>
    </>
  );
});

export const ResourceGroupNode = memo(({ id, data }: CustomNodeProps) => {
  const { setNodes } = useReactFlow();
  
  const onResize = useCallback((_: React.MouseEvent, params: ResizeParams) => {
    const { width, height } = params;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            style: {
              ...node.style,
              width,
              height,
            },
          };
        }
        return node;
      })
    );
  }, [id, setNodes]);
  
  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={100} onResize={() => onResize}>
        <ResizeIcon />
      </NodeResizeControl>
      
      <div style={{ 
        backgroundColor: 'rgba(128, 0, 128, 0.2)', 
        border: '1px solid rgba(128, 0, 128, 0.5)',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        padding: '10px'
      }}>
        <div>{data.label}</div>
      </div>
      
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

export const VnetNode = memo(({ id, data }: CustomNodeProps) => {
  const { setNodes } = useReactFlow();
  
  const onResize = useCallback((_: React.MouseEvent, params: ResizeParams) => {
    const { width, height } = params;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            style: {
              ...node.style,
              width,
              height,
            },
          };
        }
        return node;
      })
    );
  }, [id, setNodes]);
  
  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={70} minHeight={30} onResize={() => onResize}>
        <ResizeIcon />
      </NodeResizeControl>
      
      <div style={{ 
        backgroundColor: 'rgba(0, 120, 212, 0.15)',
        border: '1px solid rgba(0, 120, 212, 0.7)',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        padding: '10px'
      }}>
        <div>{data.label}</div>
      </div>
      
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});