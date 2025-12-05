import { useParams } from "react-router";
import UserCardtable from "./components/UserCardTable";
import { UserCardForm } from "./components/UserCardForm";

export function UserCard() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="m-2 flex grow flex-col border">
      <div className="m-2 flex flex-col items-center border py-8">
        <div>Карточка пользователя</div>
        <UserCardForm id={Number(id)} />
      </div>
      <UserCardtable id={Number(id)} />
    </div>
  );
}
