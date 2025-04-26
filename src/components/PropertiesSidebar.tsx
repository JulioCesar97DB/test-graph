import { CustomNode } from '../types';

interface PropertiesSidebarProps {
  selectedNode: CustomNode | null;
}

export default function PropertiesSidebar({ selectedNode }: PropertiesSidebarProps) {
  console.log('PropertiesSidebar received:', selectedNode);
  return (
    <aside className="w-64 p-4">
      {selectedNode ? (
        <div>
          <h3 className="text-xl font-medium mb-4">Properties</h3>
          
          <div className="space-y-3">
            <div className='bg-neutral-700 p-2 rounded-md'>
              <label className="block text-sm font-medium text-white">ID</label>
              <div className="mt-1 text-sm">{selectedNode.id}</div>
            </div>
            
            <div className='bg-neutral-700 p-2 rounded-md'>
              <label className="block text-sm font-medium text-white">Type</label>
              <div className="mt-1 text-sm">{selectedNode.type}</div>
            </div>
            
            <div className='bg-neutral-700 p-2 rounded-md'>
              <label className="block text-sm font-medium text-white">Label</label>
              <div className="mt-1 text-sm">{String(selectedNode.data?.label) || 'No label'}</div>
            </div>
            
            {selectedNode.parentId && (
              <div className='bg-neutral-700 p-2 rounded-md'>
                <label className="block text-sm font-medium text-white">Parent</label>
                <div className="mt-1 text-sm">{selectedNode.parentId}</div>
              </div>
            )}
            
            <div className='bg-neutral-700 p-2 rounded-md'>
              <label className="block text-sm font-medium text-white">Position</label>
              <div className="mt-1 text-sm">
                X: {selectedNode.position.x.toFixed(2)}, Y: {selectedNode.position.y.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-6">
          Select a node to see its properties
        </div>
      )}
    </aside>
  );
}