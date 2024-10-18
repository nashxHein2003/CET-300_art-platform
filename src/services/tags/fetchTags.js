import React from 'react';
import { supabaseClient } from '../supaBase';

const fetchTags = async () => {
  const { data, error } = await supabaseClient.from('artwork_tags').select();

  if (error) {
    console.log('Error fetching tags:', error);
  }

  return data;
};

export default fetchTags;
