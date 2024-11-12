import { api } from "./api";
import { enumStatus } from "~/enum/status.enum";
import { UserTypes } from "~/types/user.type";

export class PostService {
    static async getRegistration(): Promise<UserTypes[] | undefined> {
        try {
            const response = await api.get<UserTypes[]>("/registrations");
            return response.data;
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
    }

    static async getRegistrationByDoc(cpf: string): Promise<UserTypes | undefined> {
        try {
            const response = await api.get<UserTypes[]>(`/registrations?cpf=${cpf}`);
            return response.data[0];
        } catch (error) {
            console.error(`Error fetching registration with CPF ${cpf}:`, error);
        }
    }

    static async updateRegistrationStatus(data: UserTypes, status: enumStatus): Promise<UserTypes | undefined> {
        const updatedData = { ...data, status };
        try {
            const response = await api.put<UserTypes>(`/registrations/${data.id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar status: ${status}:`, error);
        }
    }

    static async reproveRegistration(data: UserTypes): Promise<UserTypes | undefined> {
        return this.updateRegistrationStatus(data, enumStatus.reproved);
    }

    static async approveRegistration(data: UserTypes): Promise<UserTypes | undefined> {
        return this.updateRegistrationStatus(data, enumStatus.approved);
    }

    static async reviewRegistration(data: UserTypes): Promise<UserTypes | undefined> {
        return this.updateRegistrationStatus(data, enumStatus.review);
    }

    static async deleteRegister(id: number): Promise<{ id: number }| undefined> {
        try {
            const response = await api.delete(`/registrations/${id}`);
          return response.data;
          
        } catch (error) {
          console.error(`Error deleting registration with id ${id}:`, error);
        }
      }
}