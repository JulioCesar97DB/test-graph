import { useDnD } from "../context/DnDContext";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode subscription" onDragStart={(event) => onDragStart(event, 'subscription')} draggable>
        Subscription Node
      </div>
      <div className="dndnode resourceGroup" onDragStart={(event) => onDragStart(event, 'resourceGroup')} draggable>
        Resource Group Node
      </div>
      <div className="dndnode vnet" onDragStart={(event) => onDragStart(event, 'vnet')} draggable>
        VNet Node
      </div>
    </aside>
  );
}