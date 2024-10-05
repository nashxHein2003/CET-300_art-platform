import { useState } from 'react';

const useSideBarState = () => {
  const [control, setControl] = useState({ isExpanded: false });

  const toggleSidebar = () => {
    setControl((prevState) => ({ isExpanded: !prevState.isExpanded }));
  };

  return { control, toggleSidebar };
};

export default useSideBarState;
