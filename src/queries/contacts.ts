import { QueryFunction, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Account } from '@prisma/client';
import API from '@/lib/API';

const queryFn: QueryFunction<Account[], [string]> = async () => {
  try {
    const response = await API.get('/get-contacts');

    // hide the inCorrect property from the response
    // response.data.contacts.forEach((contact: Account) =>
    //   Object.defineProperty(contact, 'isCorrect', { enumerable: false }),
    // );

    console.log('response -----> ', response.data);

    return response.data.contacts;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
};

export const CONTACTS_REFRESH_KEY = 'contacts';

export const useContactsQueries = (refreshKey = CONTACTS_REFRESH_KEY) => {
  const query = useQuery({
    queryKey: [refreshKey],
    queryFn,
  });

  useEffect(() => {
    // console.log( 'query hero: ', query.error, query.isLoading, query.data )
  }, [query]);

  return query;
};
