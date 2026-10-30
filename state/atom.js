import { atom, RecoilEnv } from "recoil";

// Next.js re-evaluates this module per page entry on the server, which
// falsely trips Recoil's duplicate-key check. Safe for this app's atom setup.
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

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
