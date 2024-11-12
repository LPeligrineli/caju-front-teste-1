const firstLetter = (name: string): string => {
    return name.charAt(0).toUpperCase();
  }
  
  export const fullNameIsValid = (name: string): boolean => {
    const names = name.trim().split(" ");
    if (names.length < 2) {
      return false;
    }
  
    for (const part of names) {
      if (part.length < 2) {
        return false;
      }
      if (!isNaN(Number(firstLetter(part)))) {
        return false;
      }
    }
  
    return true;
  };