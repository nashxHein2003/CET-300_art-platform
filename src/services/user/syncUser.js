import React, { useEffect } from 'react';
import { supabaseAdmin, supabaseClient } from '../supaBase';

const SyncUsers = () => {
  const syncUsersToCustomTable = async () => {
    try {
      const { data: authUsers, error: fetchError } =
        await supabaseAdmin.auth.admin.listUsers();
      if (fetchError) throw fetchError;

      for (const user of authUsers.users) {
        const { email, id } = user;
        let baseUsername = email.split('@')[0];

        const { data: existingUser, error: existingUserError } =
          await supabaseClient.from('user').select('*').eq('user_id', id);

        if (!existingUser || existingUser.length === 0) {
          let finalUsername = baseUsername;
          let counter = 1;
          let usernameExists = true;

          while (usernameExists) {
            const { data: existingUsername, error: usernameError } =
              await supabaseClient
                .from('user')
                .select('*')
                .eq('username', finalUsername);

            if (existingUsername) {
              console.log(
                `Found existing usernames for: ${finalUsername}`,
                existingUsername
              );
            }

            if (existingUsername && existingUsername.length > 0) {
              finalUsername = `${baseUsername}_${counter}`;
              counter++;
            } else {
              usernameExists = false;
            }
          }
          const { error: insertError } = await supabaseClient
            .from('user')
            .insert([
              {
                email: email,
                user_id: id,
                username: finalUsername,
                known_as: finalUsername,
              },
            ]);

          if (insertError) {
            console.error('Error inserting user:', insertError);
          } else {
            console.log(
              'Inserted user:',
              email,
              'with username:',
              finalUsername
            );
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
    syncUsersToCustomTable();
  }, []);

  return null;
};

export default SyncUsers;
