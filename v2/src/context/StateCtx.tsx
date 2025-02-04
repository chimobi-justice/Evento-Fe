'use client';

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect, useMemo } from 'react';

interface StateContextProps {
  openMenu: boolean;
  setopenMenu: Dispatch<SetStateAction<boolean>>;
  OpenNotification: boolean;
  setOpenNotification: Dispatch<SetStateAction<boolean>>;
  OpenProfile: boolean;
  setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

const StateCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [openMenu, setopenMenu] = useState(false);
  const [OpenNotification, setOpenNotification] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent);
  };

  useEffect(() => {
    const t = '%c  Made By \ud83d\udc9a  - HNGX I10 ',
      n = [
        'font-size: 12px',
        'color: #fffce1',
        'font-family: monospace',
        'background: #0e100f',
        'display: inline-block',
        'padding: 1rem 3rem',
        'border: 1px solid #0ff',
        'border-radius: 4px;',
      ].join(';');
    console.log(t, n);
  }, []);

  const value = useMemo(
    () => ({ openMenu, setopenMenu, OpenNotification, setOpenNotification, OpenProfile, setOpenProfile }),
    [openMenu, OpenNotification, OpenProfile],
  );

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export default StateCtxProvider;

export function useStateCtx() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useStateContext must be used within an CtxProvider');
  }

  return context;
}
