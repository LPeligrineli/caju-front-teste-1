import { fullNameIsValid } from "~/utils/fullnameIsValid";

describe("fullNameIsValid", () => {
    it("should return true for valid full names", () => {
        expect(fullNameIsValid("Leonidas Peligrineli")).toBe(true);
        expect(fullNameIsValid("Leonidas Peligrineli da Silva Sauro")).toBe(true);
    });

    it("should return false for names with less than two parts", () => {
        expect(fullNameIsValid("Leonidas")).toBe(false);
    });

    it("should return false for names with parts less than two characters", () => {
        expect(fullNameIsValid("Leo Pel")).toBe(true);
    });

    it("should return false for names starting with a number", () => {
        expect(fullNameIsValid("123 Peligrineli")).toBe(false);
        expect(fullNameIsValid("Leonidas Peligrineli da Silva 2auro")).toBe(false);
    });
});