import { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext, useRef, useEffect } from "react";
import { UserTypes } from "~/types/user.type";
import { useLoadingContext } from "./loading.context";
import { PostService } from "~/services/posts";

type RegisterContextType = {
  registration: UserTypes[];
  setRegistration: Dispatch<SetStateAction<UserTypes[]>>;
  removeRegistration: (id: number) => void;
  updateRegistrationStatus: (id: number, status: string) => void;
  CacheRegistration: React.MutableRefObject<UserTypes[]>;
};

type RegisterProviderProps = {
  children: ReactNode;
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const [registration, setRegistration] = useState<UserTypes[]>([]);
  const CacheRegistration = useRef<UserTypes[]>(registration);
  const { setLoading } = useLoadingContext();

  const fetchRegistrations = () => {
    setLoading(true);
    PostService.getRegistration()
      .then((response) => {
        if (response) {
          setRegistration(response);
          CacheRegistration.current = response;
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const removeRegistration = (id: number) => {
    setRegistration((prev) => prev.filter((registration) => registration.id !== id));
  }

  const updateRegistrationStatus = (id: number, status: string) => {
    setRegistration((prev) => prev.map((registration) => {
      if (registration.id === id) {
        return { ...registration, status };
      }
      return registration;
    }));
  };

  return (
    <RegisterContext.Provider value={{ registration, setRegistration, CacheRegistration, removeRegistration, updateRegistrationStatus }}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegisterContext must be used within a RegisterProvider");
  }
  return context;
};

export { RegisterProvider, useRegisterContext };
export default RegisterProvider;
