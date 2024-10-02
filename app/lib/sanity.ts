import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'ryafbpz8',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: true,
});
