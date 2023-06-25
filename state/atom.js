import { atom } from "recoil";

export const filesPreviewData = atom({
  key: "filesPreviewDataKey",
  default: [],
});

export const filesData = atom({
  key: "filesDataKey",
  default: [],
});

export const previewFilesList = atom({
  key: "previewFilesListKey",
  default: [],
});

export const contentFilesList = atom({
  key: "contentFilesListKey",
  default: [],
});

export const discoveryFilesList = atom({
  key: "discoveryFilesListKey",
  default: [],
});

export const discoveryFilesData = atom({
  key: "discoveryFilesDataKey",
  default: [],
});
