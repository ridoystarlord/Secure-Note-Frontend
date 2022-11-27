import type { NextPage } from 'next';
import React from 'react';

import CreateNote from '../components/CreateNote/CreateNote';
import GeneralUrl from '../components/GeneralUrl/GeneralUrl';
import Navbar from '../components/Navbar/Navbar';
import { NoteResponse } from '../types/NoteResponse';

const Home: NextPage = () => {
  const [showCreateNotePage, setShowCreateNotePage] = React.useState(true);
  const [createNoteData, setCreateNoteData] =
    React.useState<NoteResponse | null>(null);

  React.useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        setShowCreateNotePage(true);
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      {showCreateNotePage ? (
        <CreateNote
          setShowCreateNotePage={setShowCreateNotePage}
          setCreateNoteData={setCreateNoteData}
        />
      ) : (
        <GeneralUrl createNoteData={createNoteData} />
      )}
    </div>
  );
};

export default Home;
