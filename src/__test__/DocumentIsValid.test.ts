import { documentIsValid } from "~/utils/documentIsValid";

describe("documentIsValid", () => {
    it("should return true for valid CPF", () => {
        expect(documentIsValid("12345678909")).toBe(true);
    });

    it("should return false for invalid CPF", () => {
        expect(documentIsValid("12345678900")).toBe(false);
    });
    it("should return false for invalid CPF if has separators", () => {
        expect(documentIsValid("123.456.789-00")).toBe(false);
    });
});