import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

export type DialogStore = {
  isOpen: boolean;
  title?: string | null;
  type?: string | null;
  description?: string | null;
  component?: SvelteComponent | null | string;
  data?: any;
};
const defaultDialogStore: DialogStore = {
  isOpen: false,
  title: null,
  type: null,
  description: null,
  data: null,
  component: null,
};

export const dialogStore = writable<DialogStore>(defaultDialogStore);

export const openDialog = (dialogStoreParams: Omit<DialogStore, "isOpen">) => {
  dialogStore.set({
    isOpen: true,
    ...dialogStoreParams,
  });
};

export const closeDialog = () => {
  dialogStore.set(defaultDialogStore);
};
