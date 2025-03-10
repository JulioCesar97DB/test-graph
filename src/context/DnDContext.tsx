import { createContext, useContext, useState, ReactNode } from 'react';

type NodeType = 'subscription' | 'resourceGroup' | 'vnet' | null;
type DnDContextType = [NodeType, React.Dispatch<React.SetStateAction<NodeType>>];

const DnDContext = createContext<DnDContextType>([null, () => {}]);

interface DnDProviderProps {
  children: ReactNode;
}

export const DnDProvider = ({ children }: DnDProviderProps) => {
  const [type, setType] = useState<NodeType>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useDnD = (): DnDContextType => {
  return useContext(DnDContext);
}