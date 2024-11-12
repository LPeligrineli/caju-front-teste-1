import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/ui/Buttons";
import { IconButton } from "~/components/ui/Buttons/IconButton";
import TextField from "~/components/ui/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { Controller } from "react-hook-form";
import React, { useEffect } from "react";
import { Masks } from "~/utils/masks";
import { documentIsValid } from "~/utils/documentIsValid";
import { SearchField, useValidateDocument } from "~/hooks/useValidateDocument";
import { PostService } from "~/services/posts";
import { useRegisterContext } from "~/context/registrations.context";
import { UserTypes } from "~/types/user.type";

interface SearchBarProps {
  previousRegistration: React.MutableRefObject<UserTypes[]>;
  refetch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ refetch }) => {
  const { control, watch, handleSubmit, reset, formState: { errors } } = useValidateDocument();
  const { setRegistration, CacheRegistration } = useRegisterContext();

  const history = useHistory();
  const { search } = watch();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onSubmit = async (data: SearchField): Promise<void> => {
    const payload = { ...data };
    console.log(payload);
  };

  const refetchRegistrations = () => {
    refetch();
    reset({ search: "" });
  };

  useEffect(() => {
    if (documentIsValid(search)) {
      PostService.getRegistrationByDoc(Masks.clearCPF(search))
        .then((response) => {
          if (response) {
            const newRegistrations = [response];
            setRegistration(newRegistrations);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setRegistration(CacheRegistration.current);
    }
  }, [search, setRegistration, CacheRegistration]);

  return (
    <S.Container>
      <S.SearchForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Digite um CPF válido"
              onChange={(e) => field.onChange(Masks.cpf(e.target.value))}
              error={errors.search?.message}
            />
          )}
        />
      </S.SearchForm>

      <S.Actions>
        <IconButton onClick={refetchRegistrations} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};