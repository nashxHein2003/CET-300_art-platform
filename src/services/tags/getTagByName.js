import React from 'react';
import { supabaseClient } from '../supaBase';

const getTagByName = (tagName) => {
  const { data, error } = supabaseClient
    .from('tags')
    .select('*')
    .eq('tag_name');
};
