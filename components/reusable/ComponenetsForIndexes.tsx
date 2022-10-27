import React from 'react'
import dynamic from 'next/dynamic';
import EmojiPickerModal from '../modals/EmojiPickerModal';
const BottomNav = dynamic(() => import('../navBars/BottomNav'));
const CreationModal = dynamic(() => import('../modals/CreationModal'));
const MenuModal = dynamic(() => import('../modals/MenuModal'));
const ProfileDropDownModal = dynamic(() => import('../modals/ProfileDropdownModal'));
const VoiceNavigationModal = dynamic(() => import('../modals/VoiceNavigationModal'));

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
