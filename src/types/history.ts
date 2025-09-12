import React from "react";

// export type HistoryItem = {
//   id: string | number;
//   title: string;
//   description?: string;
//   timestamp: string;
//   icon?: React.ReactNode;
//   titleClassName?: string;
//   badge?: React.ReactNode;
//   itemClassName?: string;
// };
export type HistoryItem = {
  id: string | number;
  batchId?: string | number;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  titleClassName?: string;
  badge?: React.ReactNode;
  itemClassName?: string;
};
