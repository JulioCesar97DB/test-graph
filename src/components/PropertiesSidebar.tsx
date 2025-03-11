interface Node {
  id: string;
  type: string;
  data?: {
    label?: string;
  };
  position: {
    x: number;
    y: number;
  };
  parentId?: string;
}

interface PropertiesSidebarProps {
  selectedNode: Node | null;
}

export default function PropertiesSidebar({ selectedNode }: PropertiesSidebarProps) {
  return (
    <aside className="w-64 p-4 bg-gray-50 border-l border-gray-200">
      {selectedNode ? (
        <div>
          <h3 className="text-lg font-medium mb-4">Properties</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">ID</label>
              <div className="mt-1 text-sm">{selectedNode.id}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Type</label>
              <div className="mt-1 text-sm">{selectedNode.type}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Label</label>
              <div className="mt-1 text-sm">{selectedNode.data?.label || 'No label'}</div>
            </div>
            
            {selectedNode.parentId && (
              <div>
                <label className="block text-sm font-medium text-gray-600">Parent</label>
                <div className="mt-1 text-sm">{selectedNode.parentId}</div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Position</label>
              <div className="mt-1 text-sm">
                X: {selectedNode.position.x.toFixed(2)}, Y: {selectedNode.position.y.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-6 text-gray-500">
          Select a node to see its properties
        </div>
      )}
    </aside>
  );
}