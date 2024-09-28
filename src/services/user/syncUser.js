// SyncUsers.js
import React, { useEffect } from 'react';
import { supabaseAdmin, supabaseClient } from '../supaBase';

const SyncUsers = () => {
  const syncUsersToCustomTable = async () => {
    try {
      // Fetch users from the authentication table
      const { data: authUsers, error: fetchError } =
        await supabaseAdmin.auth.admin.listUsers();
      if (fetchError) throw fetchError;

      // Loop through each user and insert them into the custom user table
      for (const user of authUsers.users) {
        const { email, id } = user;

        // Check if the user already exists in the custom users table
        const { data: existingUser, error: existingUserError } =
          await supabaseClient.from('user').select('*').eq('user_id', id);

        if (!existingUser || existingUser.length === 0) {
          // Insert new user into the custom users table with a default username
          const { error: insertError } = await supabaseClient
            .from('user')
            .insert([
              {
                email: email,
                user_id: id,
                username: email.split('@')[0], // Default username
                known_as: email.split('@')[0], // Default known_as
              },
            ]);

          if (insertError) {
            console.error('Error inserting user:', insertError);
          } else {
            console.log('Inserted user:', email);
          }
        } else {
          console.log('User already exists:', email);
        }
      }
    } catch (error) {
      console.error('Error syncing users:', error);
    }
  };

  useEffect(() => {
    // Call the function when the component mounts
    syncUsersToCustomTable();
  }, []);

  return null; // This component doesn't render anything visible
};

export default SyncUsers;
