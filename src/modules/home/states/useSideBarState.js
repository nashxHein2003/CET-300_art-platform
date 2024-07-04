import { useState } from 'react';

const useSideBarState = () => {
  const [control, setControl] = useState({ isExpanded: false });

  const sidebarMenu = () => {
    setControl((prevState) => ({ isExpanded: !prevState.isExpanded }));
  };

  return { control, sidebarMenu };
};

export default useSideBarState;
