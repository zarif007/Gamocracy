import React from 'react'
import BottomNav from './BottomNav'
import CreationModal from './modals/CreationModal';
import MenuModal from './modals/MenuModal';
import ProfileDropDownModal from './modals/ProfileDropdownModal';
import VoiceNavigationModal from './modals/VoiceNavigationModal';

const ComponenetsForIndexes = () => {
  return (
    <>
      <BottomNav />
      <MenuModal />
      <ProfileDropDownModal />
      <VoiceNavigationModal />
      <CreationModal />
    </>
  )
}

export default ComponenetsForIndexes
