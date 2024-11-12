import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect, useRef } from "react";
import { PostService } from "~/services/posts";
import { useRegisterContext } from "~/context/registrations.context";
import { useLoadingContext } from "~/context/loading.context";
import { ToastContainer } from "react-toastify";

const DashboardPage = () => {
  const { registration, setRegistration } = useRegisterContext();
  const { isLoading, setLoading } = useLoadingContext();
  const previousRegistration = useRef(registration);

  const fetchRegistrations = () => {
    setLoading(true);
    PostService.getRegistration()
      .then((response) => {
        if (response) {
          setRegistration(response);
          previousRegistration.current = response;
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
  },[]);

  return (
    <S.Container>
      <SearchBar refetch={fetchRegistrations} previousRegistration={previousRegistration}/>
      <Collumns registrations={registration} isLoading={isLoading} />
      <ToastContainer />
    </S.Container>
  );
};
export default DashboardPage;
