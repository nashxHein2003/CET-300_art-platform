import React, { useEffect } from 'react';
import AppLayout from '../../../components/Layout/AppLayout';
import { useParams, useNavigate } from 'react-router-dom';
import useArtworkDetail from '../../../hooks/Artwork/useArtworkDetail';
import Navbar from '../../../components/Navbar/Navbar';
import SideBar from '../../../components/Sidebar/SideBar';
import useSideBarState from '../../../hooks/useSideBarState';
import {
  ArtworkActions,
  ArtworkHeader,
  ArtworkImage,
  UserGallery,
} from './../../../components/export';
import useArtworkTag from '../../../hooks/Artwork/useArtworkTag';
import ArtworkStatus from '../../../components/Artwork/ArtworkStatus';
import useArtworkLike from '../../../hooks/Artwork/useArtworkLike';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/Auth/AuthContext';
import Authorized from './Authorized';
import ArtworkDetailMain from './ArtworkDetailMain';

const ArtworkDetail = ({ children }) => {
  const { token } = useAuth();
  return (
    <>
      <ArtworkDetailMain />
    </>
  );
};

ArtworkDetail.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArtworkDetail;
