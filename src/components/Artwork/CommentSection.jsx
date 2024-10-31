import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCommentService from '../../services/interactions/getCommentService';
import UserInfoByEmail from '../../services/user/userInfoByEmail';
import PropTypes from 'prop-types';
import { supabaseClient } from '../../services/supaBase';
import { useAuth } from '../../context/Auth/AuthContext';

const CommentSection = ({ artwork, currentUser }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentUserData, setCommentUserData] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getCommentService(artwork.artwork_id);
        setComments(fetchedComments);

        const userInfoPromises = fetchedComments.map(async (comment) => {
          const userInfo = await UserInfoByEmail(comment.email);
          return { ...comment, userInfo };
        });

        const commentsWithUserInfo = await Promise.all(userInfoPromises);
        console.log('Comment User info:', commentsWithUserInfo);
        setCommentUserData(commentsWithUserInfo);
      } catch (err) {
        console.log('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [artwork.artwork_id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    try {
      const newCommentData = {
        email: currentUser.email,
        artwork_id: artwork.artwork_id,
        comment: newComment,
        userInfo: [
          {
            profile_url: currentUser.profile_url,
            known_as: currentUser.known_as,
          },
        ],
      };

      setCommentUserData((prevComments) => [...prevComments, newCommentData]);
      setNewComment('');

      const { error } = await supabaseClient.from('comment').insert([
        {
          email: currentUser.email,
          artwork_id: artwork.artwork_id,
          comment: newComment,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="w-full h-auto flex flex-col"
    >
      <div className="w-full h-auto flex flex-row mb-2">
        <span className="text-lg text-white">Comments</span>
      </div>

      <div className="w-full h-auto flex flex-row gap-x-3 mb-3">
        <Link className="w-10 h-10 rounded-md overflow-hidden">
          <img
            src={
              currentUser?.profile_url ??
              'https://massagecareclinic.com/wp-content/uploads/2016/08/profile-icon.png'
            }
            alt="User avatar"
            className="w-full h-full object-cover object-center"
          />
        </Link>
        <textarea
          id="comment"
          value={newComment}
          onChange={handleCommentChange}
          className="border border-gray-700 rounded p-2 w-full h-24 text-white bg-dark-lighter-nav"
          placeholder="Write a comment..."
        />
      </div>

      <div className="w-full h-auto flex flex-row justify-between gap-x-3 mb-5">
        <div></div>
        <button
          type="submit"
          className="px-4 py-2 bg-dark-primary text-white rounded-sm mb-4 hover:bg-dark-primary-hover"
          onClick={() => {
            token === null ? navigate('/login') : null;
          }}
        >
          Comment
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        commentUserData.map((comment) => (
          <div
            className="w-full h-auto flex flex-row gap-x-3 mb-3"
            key={comment.comment_id}
          >
            <Link className="w-10 h-10 rounded-md overflow-hidden">
              <img
                src={
                  comment.userInfo[0].profile_url ??
                  'https://massagecareclinic.com/wp-content/uploads/2016/08/profile-icon.png'
                }
                alt="User avatar"
                className="w-full h-full object-cover object-center"
              />
            </Link>
            <div className="w-full h-auto bg-dark-lighter-theme border-gray-600 border-2 rounded-md p-3">
              <span className="text-gray-400 font-bold">
                {comment.userInfo[0].known_as ?? 'Anonymous'}
              </span>
              <div className="text-white text-xs">{comment.comment}</div>
            </div>
          </div>
        ))
      )}
    </form>
  );
};

CommentSection.propTypes = {
  artwork: PropTypes.shape({
    artwork_id: PropTypes.number.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    profile_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    known_as: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentSection;
