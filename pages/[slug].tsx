import { useQuery } from '@tanstack/react-query';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { getNoteByUrl } from '../services/note.service';

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;

  // **  Data Fetching ** //
  const { api, getKey } = getNoteByUrl(slug ? slug.toString() : '');
  const { data, refetch } = useQuery(getKey(), api, {
    enabled: Boolean(slug),
  });

  console.log(data);

  // **  Data Fetching ** //

  return <div>{data?.message}</div>;
};
export default Slug;
