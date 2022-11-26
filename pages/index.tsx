import type { NextPage } from 'next';

import CreateNote from '../components/CreateNote/CreateNote';
import Navbar from '../components/Navbar/Navbar';

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <CreateNote />
    </div>
  );
};

export default Home;
