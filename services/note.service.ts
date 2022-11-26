import axios from 'axios';

import { noteType } from '../components/CreateNote/CreateNote';
import { API_URL } from '../environment/environment';

export const createNewNote = () => {
  return {
    api(note: noteType) {
      return axios
        .post(`${API_URL}/note/new/`, note, {
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
