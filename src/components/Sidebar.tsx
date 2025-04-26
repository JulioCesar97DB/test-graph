import { useDnD } from "../context/DnDContext";

type NodeType = 'subscription' | 'resourceGroup' | 'vnet';

export default function Sidebar() {
  const [ , setType] = useDnD();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="space-y-5">
      <div className="bg-neutral-700 p-3 rounded-md hover:bg-neutral-600 cursor-grab subscription" onDragStart={(event) => onDragStart(event, 'subscription')} draggable>
        Subscription Node
      </div>
      <div className="bg-neutral-700 p-3 rounded-md hover:bg-neutral-600 cursor-grab resourceGroup" onDragStart={(event) => onDragStart(event, 'resourceGroup')} draggable>
        Resource Group Node
      </div>
      <div className="bg-neutral-700 p-3 rounded-md hover:bg-neutral-600 cursor-grab vnet" onDragStart={(event) => onDragStart(event, 'vnet')} draggable>
        VNet Node
      </div>
    </aside>
  );
}