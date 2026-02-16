import React from 'react';

export const ApplyModalContext = React.createContext<{ openApplyModal: () => void } | null>(null);

export function useApplyModal(): () => void {
  const ctx = React.useContext(ApplyModalContext);
  if (!ctx) return () => {};
  return ctx.openApplyModal;
}
