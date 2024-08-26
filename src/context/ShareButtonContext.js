import React, { createContext, useState } from 'react';

export const ShareButtonContext = createContext();

export const ShareButtonProvider = ({ children }) => {
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(false);

  return (
    <ShareButtonContext.Provider
      value={{ isShareButtonEnabled, setIsShareButtonEnabled }}
    >
      {children}
    </ShareButtonContext.Provider>
  );
};
