import axios from 'axios';

import { API_URL } from 'environment';

import { noteType } from '../components/CreateNote/CreateNote';
import { hiddenNoteType } from '../pages/[slug]';
import { NoteDeleteResponse, NoteResponse } from '../types/NoteResponse';

export const createNewNote = () => {
  return {
    api(note: noteType) {
      return axios
        .post<NoteResponse>(`${API_URL}/note/new/`, note, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['createNewNote'];
    },
  };
};

export const getNoteByUrl = (url?: string) => {
  return {
    api() {
      return axios
        .get(`${API_URL}/note/${url}/`, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getNoteByUrl', url];
    },
  };
};

export const deleteNote = () => {
  return {
    api(url: string) {
      return axios
        .delete<NoteDeleteResponse>(`${API_URL}/note/${url}`, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteNote'];
    },
  };
};

export const getHiddenNoteByUrl = (url?: string) => {
  return {
    api(note: hiddenNoteType) {
      return axios
        .post<NoteResponse>(`${API_URL}/note/hidden/${url}/`, note, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getHiddenNoteByUrl', url];
    },
  };
};
