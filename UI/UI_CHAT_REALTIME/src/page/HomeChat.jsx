import { PeopleList, Chat } from "../components";
function HomeChat() {
  return (
    <div className="container">
      <div className="row">
        <PeopleList />
        <Chat />
      </div>
    </div>
  );
}

export default HomeChat;
