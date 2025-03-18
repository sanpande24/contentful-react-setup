import { createClient } from "contentful";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_DELIVERY_TOKEN,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
});
export const fetchEntries = async () => {
    try {
      const entries = await client.getEntries({ content_type: 'trainingHub' });
  
      return entries.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title || '',
        description: item.fields.description || { json: {} },
        resourceType: item.fields.resourceType || [],
        tags: item.fields.tags || [],
        date: item.fields.date || '', // Ensure date is correctly included
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };