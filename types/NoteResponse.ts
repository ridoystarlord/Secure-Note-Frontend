export type NoteResponse = {
  createdAt?: string;
  destroyTime?: string | null;
  url?: string;
  askForConfirmation?: boolean;
  message?: string;
  name?: string;
  email?: string;
  isDestroyed?: boolean;
};

export type NoteDelteResponse = {
  message?: string;
};
