import { api } from "./api";
import { NewUserType } from '~/types/newUser.type';

export const createUser = async (data: NewUserType): Promise<any> => {
    try {
        const response = await api.post("/registrations", data);
        return response;
    }
    catch (error) {
        console.error(error);
    }
}