import { QueryFunction, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import API from '@/lib/API';
import { Sent } from '.prisma/client';

const queryFn: QueryFunction<Sent[], [string]> = async () => {
  try {
    const response = await API.get('/get-outbox');

    // hide the inCorrect property from the response
    // response.data.contacts.forEach((contact: Account) =>
    //   Object.defineProperty(contact, 'isCorrect', { enumerable: false }),
    // );

    console.log('outbox - response -----> ', response.data);

    return response.data.outbox;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const OUTBOX_REFRESH_KEY = 'outbox';
export const useOutBoxQuery = (refreshKey = OUTBOX_REFRESH_KEY) => {
  const query = useQuery({
    queryKey: [refreshKey],
    queryFn,
  });

  useEffect(() => {
    // console.log( 'query hero: ', query.error, query.isLoading, query.data )
  }, [query]);

  return query;
};
