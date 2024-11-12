import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentIsValid } from "~/utils/documentIsValid";

const DocumentSchema = z.object({
    search: z.string().refine(documentIsValid, {
        message: "Documento inválido",
    }),
});

export type SearchField = z.infer<typeof DocumentSchema>;

export const useValidateDocument = () => {
    return useForm<SearchField>({
        resolver: zodResolver(DocumentSchema),
        defaultValues: {
            search: "",
        },
    });
}