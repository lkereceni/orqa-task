import type { ReactElement } from "react";

export type MenuItem = {
  id: number;
  label: string;
  icon: ReactElement;
  url: string;
};
