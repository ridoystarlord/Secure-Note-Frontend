export type NoteResponse = {
  createdAt?: string;
  destroyTime?: string | null;
  url?: string;
  askForConfirmation?: boolean;
  message?: string;
  name?: string;
  email?: string;
  frontendSecretKey?: string;
  isDestroyed?: boolean;
};

export type NoteDeleteResponse = {
  message?: string;
};
export type NoteHasPasswordResponse = {
  message?: string;
  hasPassword?: boolean;
};
export type NoteDestroyedResponse = {
  message?: string;
  isDestroyed?: boolean;
};
