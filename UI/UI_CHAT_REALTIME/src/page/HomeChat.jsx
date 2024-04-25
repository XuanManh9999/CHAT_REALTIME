import { PeopleList, Chat } from "../components";
function HomeChat() {
  return (
    <div className="container-lg">
      <div className="row overflow-hidden">
        <PeopleList />
        <Chat />
      </div>
    </div>
  );
}

export default HomeChat;
