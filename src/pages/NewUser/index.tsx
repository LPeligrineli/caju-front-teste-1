import TextField from "~/components/ui/TextField";
import * as S from "./styles";
import Button from "~/components/ui/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/ui/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { Controller } from "react-hook-form";
import { Form } from "~/components/Form/styles";
import { useNewUserForm } from "~/hooks/useNewUserForm";
import { createUser } from "~/services/createUser";
import { NewUserType } from "~/types/newUser.type";
import { enumStatus } from "~/enum/status.enum";
import { Masks } from "~/utils/masks";
import { ToastContainer, toast } from "react-toastify";


const NewUserPage = () => {

  const { control, handleSubmit, formState: { errors } } = useNewUserForm();

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const onSubmit = async (data: NewUserType): Promise<void> => {
    const payload = {...data, status: enumStatus.review};
    try {
      await createUser(payload);
      history.push(routes.dashboard);
      toast.success("Usuário cadastrado com sucesso");
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="employeeName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Nome"
                label="Nome"
                error={errors.employeeName?.message}
                data-testid="employeeName"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Email"
                label="Email"
                type="email"
                error={errors.email?.message}
                data-testid="email"
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="CPF"
                label="CPF"
                error={errors.cpf?.message}
                onChange={(e) => {
                  field.onChange(Masks.cpf(e.target.value));
                }}
                data-testid="cpf"
              />
            )}
          />
          <Controller
            name="admissionDate"
            control={control}
            rules={{ required: "A data de admissão é obrigatória" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Data de admissão"
                type="date"
                error={errors.admissionDate?.message}
                data-testid="admissionDate"
              />
            )}
          />


          <Button data-testid="submit" >Cadastrar</Button>
        </Form>
      </S.Card>
      <ToastContainer />
    </S.Container>
  );
};

export default NewUserPage;
