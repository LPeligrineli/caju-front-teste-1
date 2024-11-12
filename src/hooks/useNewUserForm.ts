import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullNameIsValid } from "~/utils/fullnameIsValid";
import { documentIsValid } from "~/utils/documentIsValid";

export const IncludeSchema = z.object({
  employeeName: z.string().min(2, "Nome e sobrenome são obrigatórios")
    .refine(fullNameIsValid, {
      message: "Nome invalido: Deve conter nome e sobrenome, e não iniciar com número",
    }),
  email: z.string().email("Email inválido"),
  cpf: z.string().refine(documentIsValid, {
    message: "CPF inválido",
  }),
  admissionDate: z.string().min(1, "Data de admissão é obrigatória"),
});

export type FormValues = z.infer<typeof IncludeSchema>;

export const useNewUserForm = () => {
  return useForm<FormValues>({
    resolver: zodResolver(IncludeSchema),
    defaultValues: {
      employeeName: "",
      email: "",
      cpf: "",
      admissionDate: "",
    },
  });
};