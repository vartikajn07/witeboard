import { atom } from "recoil";
import React, { JSX } from "react";

export const modalAtom = atom<{
  modal: JSX.Element | JSX.Element[];
  opened: boolean;
}>({
  key: "modal",
  default: {
    modal: <></>,
    opened: false,
  },
});
