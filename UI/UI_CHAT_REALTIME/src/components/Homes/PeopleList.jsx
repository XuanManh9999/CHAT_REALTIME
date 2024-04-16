import "./Homes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { allUsers } from "../../api";
import { useSelector } from "react-redux";
import { selectorUser } from "../../redux/selector";
// const contacts = [
//   {
//     id: 1,
//     name: "HTML CSS & JS",
//     status: "left 7 mins ago",
//     online: false,
//     avatar:
//       "https://p92.hu/binaries/content/gallery/p92website/technologies/htmlcssjs-overview.png",
//   },
//   {
//     id: 2,
//     name: "PHP & LARAVEL",
//     status: "online",
//     online: true,
//     avatar:
//       "https://www.site.pt/wp-content/uploads/2022/01/o-que-e-php-845x480.jpg",
//   },
//   {
//     id: 3,
//     name: "REACT JS",
//     status: "online",
//     online: false,
//     avatar:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBiBI248rgjtRfFgxc8WapC-w7npSGPi6GnV1_VUMww&s",
//   },
//   {
//     id: 4,
//     name: "NODE JS",
//     status: "left 10 hours ago",
//     online: false,
//     avatar:
//       "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
//   },
// ];

import { Container, toastMessage } from "../../share";

function PeopleList() {
  const [people, setPeople] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  const user = useSelector(selectorUser);
  useEffect(() => {
    (async () => {
      try {
        console.log("user", user?.id);
        const response = await allUsers(user?.id);
        if (response?.status === 200) {
          setPeople(response?.data?.data);
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

  const handlePostClick = () => {
    setShowPostForm(true);
  };
  console.log(people);
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
                        person?.online === 0 ? "active" : ""
                      }`}
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
                              person?.online ? "text-success" : "text-secondary"
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
