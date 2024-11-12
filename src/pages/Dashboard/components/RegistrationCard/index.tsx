import { useState } from "react";
import { ButtonSmall } from "~/components/ui/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
  HiExclamation,
  HiInformationCircle,
} from "react-icons/hi";
import { PostService } from "~/services/posts";
import { useRegisterContext } from "~/context/registrations.context";
import { UserTypes } from "~/types/user.type";
import { enumStatus } from "~/enum/status.enum";
import { Card } from "~/components/ui/Card";
import { useLoadingContext } from "~/context/loading.context";
import Dialog from "~/components/ui/Dialog";
import { DialogActions, DialogTitle } from "~/components/ui/Dialog/styles";
import { toast } from "react-toastify";


type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"delete" | enumStatus | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const { setLoading } = useLoadingContext();
  const { removeRegistration, updateRegistrationStatus } = useRegisterContext();

  const isReview = (status: string) => status === enumStatus.review;

  const handleDelete = async (id: number) => {
    setLoading(true);
    await PostService.deleteRegister(id)
      .then((response) => {
        if (response) {
          toast.success("Registro excluído com sucesso!", {position: "top-right"});
          removeRegistration(response.id);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao excluir registro!", {position: "top-right"});
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
  };

  const handleStatusChange = async (data: UserTypes, status: enumStatus) => {
    setLoading(true);
    await PostService.updateRegistrationStatus(data, status)
      .then((response) => {
        if (response) {
          toast.success(`Registro movido para ${status === enumStatus.approved ? "aprovado" : status === enumStatus.reproved ? "reprovado" : "revisado"} com sucesso!`, {position: "top-right"});
          updateRegistrationStatus(response.id, status);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao atualizar status do registro!", {position: "top-right"});
      })
      .finally(() => {
        setLoading(false);
        closeModal();
        
      });
  };

  const openModal = (action: "delete" | enumStatus, id: number) => {
    setDialogAction(action);
    setCurrentId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setDialogAction(null);
    setCurrentId(null);
    setModalIsOpen(false);
  };

  const confirmAction = () => {
    if (dialogAction === "delete" && currentId !== null) {
      handleDelete(currentId);
    } else if (dialogAction && currentId !== null) {
      handleStatusChange(props.data, dialogAction as enumStatus);
    }
  };

  return (
    <>
      <Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{props.data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{props.data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{props.data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {isReview(props.data.status) && (
            <>
              <ButtonSmall onClick={() => openModal(enumStatus.reproved, props.data.id)} bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
              <ButtonSmall onClick={() => openModal(enumStatus.approved, props.data.id)} bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
            </>
          )}
          {!isReview(props.data.status) && (
            <ButtonSmall onClick={() => openModal(enumStatus.review, props.data.id)} bgcolor="#ff8858">Revisar novamente</ButtonSmall>
          )}
          <HiOutlineTrash onClick={() => openModal("delete", props.data.id)} />
        </S.Actions>
      </Card>
      <Dialog isOpen={modalIsOpen} onClose={closeModal}>
        <DialogTitle>
          { dialogAction !== "delete" ? <HiInformationCircle size={32} color="var(--primary-color)" /> : <HiExclamation size={32} color="var(--danger-color)" />}
          
          {dialogAction === "delete" ? "Excluir" : dialogAction === enumStatus.approved ? "Aprovar" : dialogAction === enumStatus.reproved ? "Reprovar" : "Revisar"}
        </DialogTitle>
        <p>
          {dialogAction === "delete"
            ? "Tem certeza que deseja excluir este registro?"
            : `Tem certeza que deseja ${dialogAction === enumStatus.approved ? "aprovar" : dialogAction === enumStatus.reproved ? "reprovar" : "revisar"} este registro?`}
        </p>
        <DialogActions>
          <ButtonSmall onClick={closeModal} bgcolor="var(--danger-color)" color="var(--white)">Cancelar</ButtonSmall>
          <ButtonSmall onClick={confirmAction} bgcolor="var(--success-color)" color="var(--white)">Confirmar</ButtonSmall>
        </DialogActions>
      </Dialog>
      
    </>
  );
};

export default RegistrationCard;
