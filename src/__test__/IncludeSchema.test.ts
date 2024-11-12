import { IncludeSchema } from "~/hooks/useNewUserForm";

describe("IncludeSchema", () => {
    it("should validate correct data", () => {
        const data = {
            employeeName: "Leonidas Peligrineli",
            email: "leonidas@example.com",
            cpf: "12345678909",
            admissionDate: "2023-01-01",
        };
        expect(() => IncludeSchema.parse(data)).not.toThrow();
    });

    it("should invalidate incorrect data", () => {
        const data = {
            employeeName: "Leo",
            email: "invalid-email",
            cpf: "12345678900",
            admissionDate: "",
        };
        expect(() => IncludeSchema.parse(data)).toThrow();
    });
    it("should invalidate incorrect data", () => {
        const data = {
            employeeName: "12345678909",
            email: "",
            cpf: "12345678900",
            admissionDate: "",
        };
        expect(() => IncludeSchema.parse(data)).toThrow();
    });
});