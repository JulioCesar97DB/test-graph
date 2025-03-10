import { useRef, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Node,
  Edge,
  Connection,
  XYPosition,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Sidebar from "./components/Sidebar";
import { DnDProvider, useDnD } from "./context/DnDContext";
import PropertiesSidebar from "./components/PropertiesSidebar";
import {
  SubscriptionNode,
  ResourceGroupNode,
  VnetNode,
} from "./components/CustomNodes";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes: NodeTypes = {
  subscription: SubscriptionNode,
  resourceGroup: ResourceGroupNode,
  vnet: VnetNode,
};

interface CustomNode extends Node {
  width?: number;
  height?: number;
  parentId?: string;
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition, getNodes } = useReactFlow<CustomNode>();
  const [type] = useDnD();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      console.log(`[${type}] Drop position: (${position.x}, ${position.y})`);

      const currentNodes = getNodes();
      console.log(
        "Nodos actuales:",
        currentNodes.map((n) => ({ id: n.id, type: n.type, pos: n.position }))
      );

      let width = 150;
      let height = 40;

      if (type === "subscription") {
        width = 300;
        height = 300;
      } else if (type === "resourceGroup") {
        width = 200;
        height = 200;
      }

      // Inicializar el nuevo nodo
      const newNode: CustomNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
        width,
        height,
      };

      // Buscar nodo padre potencial
      let parentNode: CustomNode | null = null;

      if (type === "resourceGroup" || type === "vnet") {
        // Determinar qué tipo de nodo padre buscamos
        const parentType =
          type === "resourceGroup" ? "subscription" : "resourceGroup";

        console.log(`Buscando nodo padre de tipo: ${parentType}`);

        // Primero, encontrar todos los nodos potenciales del tipo correcto
        const potentialParents = currentNodes.filter(
          (node) => node.type === parentType
        );
        console.log(
          `Encontrados ${potentialParents.length} nodos de tipo ${parentType}`
        );

        // Para cada potencial padre, verificar si el punto está dentro
        for (const node of potentialParents) {
          const absolutePos = getAbsolutePosition(node, currentNodes);
          console.log(
            `Verificando ${node.id} (${node.type}) en posición absoluta (${absolutePos.x}, ${absolutePos.y}) con tamaño ${node.width}x${node.height}`
          );

          // Verificación explícita para depuración
          const isInside =
            position.x >= absolutePos.x &&
            position.x <= absolutePos.x + (node.width || 0) &&
            position.y >= absolutePos.y &&
            position.y <= absolutePos.y + (node.height || 0);

          console.log(
            `¿Punto (${position.x}, ${position.y}) dentro de ${node.id}?: ${
              isInside ? "SÍ" : "NO"
            }`
          );

          if (isInside) {
            console.log(
              `¡ENCONTRADO! Padre potencial: ${node.id} (${node.type})`
            );
            parentNode = node;
            break; // Salir del bucle al encontrar un padre
          }
        }

        // Si no se encontró un padre adecuado, mostrar error y salir
        if (!parentNode) {
          console.log(
            `No se encontró un nodo ${parentType} donde colocar el ${type}`
          );
          return;
        }

        // Configurar relación padre-hijo según el estándar de React Flow
        newNode.parentId = parentNode.id;
        newNode.extent = "parent";

        // Calcular posición absoluta del padre para calcular posición relativa
        const absoluteParentPos = getAbsolutePosition(parentNode, currentNodes);

        // Calcular posición relativa al padre
        newNode.position = {
          x: position.x - absoluteParentPos.x,
          y: position.y - absoluteParentPos.y,
        };

        // Verificar que quepa dentro del padre
        const margin = 10;
        const maxX = (parentNode.width || 0) - width - margin;
        const maxY = (parentNode.height || 0) - height - margin;

        if (maxX < margin || maxY < margin) {
          console.log(
            `El nodo padre es demasiado pequeño para contener un ${type}`
          );
          return;
        }

        // Ajustar posición si está fuera de los límites
        if (newNode.position.x < margin) newNode.position.x = margin;
        if (newNode.position.y < margin) newNode.position.y = margin;
        if (newNode.position.x > maxX) newNode.position.x = maxX;
        if (newNode.position.y > maxY) newNode.position.y = maxY;

        console.log(
          `Añadiendo ${type} con ID ${newNode.id} dentro de ${parentNode.type} con ID ${parentNode.id}`
        );
        console.log(
          `Posición relativa: (${newNode.position.x}, ${newNode.position.y})`
        );
      }

      // Añadir el nuevo nodo
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, getNodes, setNodes, getAbsolutePosition]
  );

  return (
    <div className="dndflow flex h-full flex-row">
      <Sidebar />
      <div className="flex flex-grow h-svh" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange as OnNodesChange}
          onEdgesChange={onEdgesChange as OnEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <PropertiesSidebar />
    </div>
  );
};

export default function WrappedDnDFlow() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
