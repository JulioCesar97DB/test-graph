import { useState } from "react";

export default function PropertiesSidebar() {
  const [selectedNode] = useState(null);

  // Logic to handle node selection and display properties

  return (
    <aside>
      {selectedNode ? (
        <div>
          <h3>Properties</h3>
          {/* Render properties of the selected node */}
        </div>
      ) : (
        <div>Select a node to see its properties</div>
      )}
    </aside>
  );
}