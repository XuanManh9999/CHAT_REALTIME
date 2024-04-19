import "./Homes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { allUsers } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { selectorUser } from "../../redux/selector";
import { ACTIONS_APP } from "../../redux/actions";
import { Container } from "../../share";
import { Context } from "../ContextApi/Context";
function PeopleList() {
  let { userOnline } = useContext(Context);
  const dispatch = useDispatch();
  const [people, setPeople] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const user = useSelector(selectorUser);
  useEffect(() => {
    (async () => {
      try {
        const response = await allUsers(user?.id);
        if (response?.status === 200) {
          const data = await response?.data?.data;
          setPeople(data);
        } else if (response?.status === 400) {
          toastMessage("error", "Id người dùng hiện tại không tồn tại");
        }
      } catch (err) {
        toastMessage(
          "error",
          "Đã xảy ra lỗi từ phía server. Không lấy được dữ liệu"
        );
      }
    })();
  }, []);
  useEffect(() => {
    if (userOnline.length > 0) {
      setPeople((prev) =>
        prev.map((item) => {
          const user = userOnline.find((user) => user.id === item.id);
          if (user) {
            return { ...item, online: 1 };
          }
          return { ...item, online: 0 };
        })
      );
    }
  }, [userOnline]);

  const handlePostClick = () => {
    setShowPostForm(true);
  };

  const hendleChat = (person) => {
    dispatch(ACTIONS_APP.selectFriend(person));
  };
  return (
    <>
      <div className="col-lg-3">
        <div className="card chat-app">
          <div id="plist" className="people-list">
            <div className="input-group input-user">
              <div className="input-group-prepend">
                <span className="">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </div>
            <ul className="list-unstyled chat-list mt-2 user-left mb-0">
              {people && people.length > 0
                ? people.map((person) => (
                    <li
                      key={person.id}
                      className={`clearfix ${
                        person?.online === 1 ? "active" : ""
                      }`}
                      onClick={() => {
                        hendleChat(person);
                      }}
                    >
                      <img
                        src={
                          person.avatar ??
                          "https://i.ibb.co/RYxD4P7/avatar-trang-4.jpg"
                        }
                        alt={person?.fullName}
                        style={{
                          width: 50,
                          marginRight: 15,
                        }}
                      />
                      <div className="about">
                        <div className="name">{person?.fullName}</div>
                        <div className="status">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className={
                              person?.online === 1 ? "online" : "offline"
                            }
                          />{" "}
                          {person?.status}
                        </div>
                      </div>
                    </li>
                  ))
                : "No data"}
            </ul>
            <button onClick={handlePostClick} className="btn-creat">
              <span className="button-inner">Tạo Phòng </span>
            </button>
          </div>
        </div>
      </div>
      {showPostForm && (
        <div className="overlay">
          <div className="update-form">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-controlp" />
              </div>
              <div className="form-group">
                <label>Images</label>
                <input type="text" className="form-controlp" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-controlp" />
              </div>
              <button type="submit" className="btn btn-success">
                Tạo Phòng
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPostForm(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <Container />
    </>
  );
}

export default PeopleList;
