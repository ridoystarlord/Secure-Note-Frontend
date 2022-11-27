import axios from 'axios';

import { noteType } from '../components/CreateNote/CreateNote';
import { API_URL } from '../environment/environment';
import { NoteDelteResponse, NoteResponse } from '../types/NoteResponse';

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
        .delete<NoteDelteResponse>(`${API_URL}/note/${url}`, {
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
