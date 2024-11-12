
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { enumStatus } from "~/enum/status.enum";
import RepeatComponent from "~/utils/repeat";
import Skeleton from "~/components/ui/Skeleton";

const allColumns = [
  { status: enumStatus.review, title: "Pronto para revisar" },
  { status: enumStatus.approved, title: "Aprovado" },
  { status: enumStatus.reproved, title: "Reprovado" },
];

type Props = {
  registrations?: any[];
  isLoading: boolean;
};
const Columns = ({ isLoading, registrations }: Props) => {

  return (
    <S.Container>
      {allColumns.map((column) => {
        const filteredRegistrations = registrations?.filter(
          (registration) => registration.status === column.status
        );
        return (



          <S.Column status={column.status} key={column.title}>
            <S.TitleColumn status={column.status}>
              {column.title}
            </S.TitleColumn>
            <S.CollumContent>
              {isLoading ? (

                <RepeatComponent times={4} >
                  <Skeleton $height="100px" />
                </RepeatComponent>


              ) : (
                <>

                  {filteredRegistrations?.map((registration) => (


                    <RegistrationCard data={registration} key={registration.id} />

                  ))}
                </>
              )}
            </S.CollumContent>
          </S.Column>



        );
      })}
    </S.Container>
  );
};

export default Columns;
