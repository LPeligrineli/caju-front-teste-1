import React from "react";
import * as S from "./styles";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay data-testid="overlay" onClick={onClose}>
      <S.Dialog onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        {children}
      </S.Dialog>
    </S.Overlay>
  );
};

export default Dialog;