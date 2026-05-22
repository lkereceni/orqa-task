import type { ReactElement } from "react";

export type User = {
  id: number;
  username: string;
  password: string;
};

export type MenuItem = {
  id: number;
  label: string;
  icon: ReactElement;
  url: string;
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
};
