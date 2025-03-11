import { createContext, useContext, useState } from 'react';
 
type DnDType = string | null;
type SetDnDType = (type: DnDType) => void;

interface DnDContextType {
  type: DnDType;
  setType: SetDnDType;
}

const DnDContext = createContext<DnDContextType>({type: null, setType: () => {}});
 
export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<DnDType>(null);
 
  return (
    <DnDContext.Provider value={{type, setType}}>
      {children}
    </DnDContext.Provider>
  );
}
 
export default DnDContext;
 
// eslint-disable-next-line react-refresh/only-export-components
export const useDnD = () => {
  return useContext(DnDContext);
}