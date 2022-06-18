import React from 'react'
import BottomNav from './BottomNav'
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
    </>
  )
}

export default ComponenetsForIndexes
