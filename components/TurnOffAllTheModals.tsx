import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { creationModal } from "../atoms/creationModal";
import { showMenu } from "../atoms/showMenuAtom";
import { showProfileDropdown } from "../atoms/showProfileDropDownAtom";
import { voiceNavModal } from "../atoms/voiceNavigationModalAtom";

const TurnOffAllTheModals = () => {
  const [openMenu, setOpenMenu] = useRecoilState(showMenu);

  const [openDropDown, setOpenDropDown] = useRecoilState(showProfileDropdown);

  const [openCreationModal, setOpenCreationModal] =
    useRecoilState(creationModal);

  const [openVoiceNavModal, setOpenVoiceNavModal] =
    useRecoilState(voiceNavModal);

  useEffect(() => {
    setOpenMenu(false);
    setOpenDropDown(false);
    setOpenCreationModal({
      modal: false,
      blog: false,
      post: false,
      ask: false,
      idea: false,
      review: false,
      poll: false,
    });
    setOpenVoiceNavModal(false);
  });

  return <></>;
};

export default TurnOffAllTheModals;
