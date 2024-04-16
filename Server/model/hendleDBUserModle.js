import { pool } from "../config/connectDB.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const getAllUsers = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [results] = await pool.execute(
        "select * from useraccount where id != ?",
        [id]
      );
      resolve({
        status: 200,
        message: "All users.",
        data: results,
      });
    } catch (err) {
      reject(err);
    }
  });

export const getUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [results] = await pool.execute(
        "select * from useraccount where id = ?",
        [id]
      );
      resolve({
        status: 200,
        message: "User.",
        data: results,
      });
    } catch (err) {
      reject(err);
    }
  });

export const addUser = (data) => {
  const { email, password, username } = data;
  const hash = bcrypt.hashSync(password, +process.env.salt);
  return new Promise(async (resolve, reject) => {
    try {
      // check email

      const [results] = await pool.execute(
        "select * from useraccount where email = ?",
        [email]
      );
      if (results.length > 0) {
        resolve({
          status: 401,
          message: "Email already exists.",
        });
      } else {
        await pool.execute(
          "insert into useraccount (email, fullName, password) values (?, ?, ?)",
          [email, username, hash]
        );

        resolve({
          status: 200,
          message: "User added.",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUser = (data) => {
  const { id, email, password, age, avatar, address, desc } = data;
  return new Promise(async (resolve, reject) => {
    try {
      await pool.execute(
        "update useraccount set email = ?, password = ?, age = ?, avatar = ?, address = ?, desc = ? where id = ?",
        [email, password, age, avatar, address, desc, id]
      );
      resolve({
        status: 200,
        message: "User updated.",
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      await pool.execute("delete from useraccount where id = ?", [id]);
      resolve({
        status: 200,
        message: "User deleted.",
      });
    } catch (err) {
      reject(err);
    }
  });

export const login = (data) => {
  const { email, password } = data;
  return new Promise(async (resolve, reject) => {
    try {
      // tìm user
      const [results] = await pool.execute(
        "select * from useraccount where email = ?",
        [email]
      );
      if (results.length === 0) {
        resolve({
          status: 401,
          message: "User not found.",
        });
      }
      const IsCheckPassword = bcrypt.compareSync(
        password,
        results[0].password,
        process.env.salt
      );
      // so sánh password
      if (!IsCheckPassword) {
        resolve({
          status: 404,
          message: "Password is incorrect.",
        });
      }

      resolve({
        status: 200,
        message: "User login.",
        data: results,
      });
    } catch (err) {
      reject(err);
    }
  });
};

// send email

export const ForgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email
      const [results] = await pool.execute(
        "select * from useraccount where email = ?",
        [email]
      );
      if (results.length === 0) {
        resolve({
          status: 401,
          message: "User not found.",
        });
      }
      // random password
      const randomPassword = Math.random().toString(36).slice(-8);

      const hash = bcrypt.hashSync(randomPassword, +process.env.salt);

      const [result] = await pool.execute(
        "update useraccount set password = ? where email = ?",
        [hash, email]
      );
      if (result?.changedRows > 0) {
        // send email
        const hendleEmail = async (email, results) => {
          try {
            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.EMAIL_USER_NAME,
                pass: process.env.EMAIL_PASSWORD,
              },
            });
            const info = await transporter.sendMail({
              from: '"APP CHAT REALTIME" <nguyenxuanmanh2992003@gmail.com>',
              to: email,
              subject: "Phản hồi yêu cầu quên mật khẩu",
              html: `
                <div
                  style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                    border-radius: 10px;
                  "
                >
                  <h2 style="color: #333">Chào bạn ${results[0].fullName}.</h2>
  
                  <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn:</p>
  
                  <p style="font-size: 18px; font-weight: bold; color: #009688">
                    Mật khẩu mới của bạn là: <span style="color: #2196f3">${randomPassword}</span>.
                    Bạn nên đăng nhập rồi đổi mật khẩu ngay sau khi đăng nhập.
                    </p>
  
                  <p>
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu bạn
                    không phải là người yêu cầu đặt lại mật khẩu, vui lòng liên hệ
                    ngay với đội hỗ trợ của chúng tôi. Qua số điện thoại: <strong> <a href="tel:0559517003">0559517003</a></strong>
                  </p>
  
                  <p style="margin-top: 20px">Trân trọng,</p>
                  <p style="font-weight: bold">Nguyễn Xuân Mạnh</p>
                </div>
              `,
            });
            return info;
          } catch (error) {
            throw error;
          }
        };
        await hendleEmail(email, results);

        resolve({
          status: 200,
          message: "Email sent.",
        });
      } else {
        resolve({
          status: 500,
          message: "An error occurred while trying to send email.",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const addFriend = (data) => {
  const { id, idFriend } = data;
  return new Promise(async (resolve, reject) => {
    try {
      await pool.execute(
        "insert into userfriend (id, idFriend) values (?, ?)",
        [id, idFriend]
      );
      resolve({
        status: 200,
        message: "Add friend.",
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteFriend = (data) => {
  const { id, idFriend } = data;
  return new Promise(async (resolve, reject) => {
    try {
      await pool.execute(
        "delete from userfriend where idMy = ? and idFriend = ?",
        [id, idFriend]
      );
      resolve({
        status: 200,
        message: "Delete friend.",
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const getFriends = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [results] = await pool.execute(
        "select idFriend from userfriend where idMy = ?",
        [id]
      );

      if (results.length === 0) {
        resolve({
          status: 404,
          message: "No friends.",
        });
      }
      let dataListFriends = [];
      for (let i = 0; i < results.length; i++) {
        const [resultsFriend] = await pool.execute(
          "select * from useraccount where id = ?",
          [results[i]]
        );
        dataListFriends.push(resultsFriend[0]);
      }

      resolve({
        status: 200,
        message: "Friends.",
        data: dataListFriends,
      });
    } catch (err) {
      reject(err);
    }
  });

export const getDataChat = (data) => {
  const { id, idFriend } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const [results] = await pool.execute(
        "select * from chat where (id = ? and idFriend = ?) or (id = ? and idFriend = ?)",
        [id, idFriend, idFriend, id]
      );
      resolve({
        status: 200,
        message: "Data chat.",
        data: results,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const createGroup = (data) => {
  const { idUser, fullName, author, desc } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await pool.execute(
        "insert into department (idUser, fullName, author, desc) values (?, ?, ?, ?)",
        [idUser, fullName, author, desc]
      );
      await pool.execute(
        "insert into userJoinDepartment (idUser, idDepartment) values (?, ?)",
        [idUser, result.insertId]
      );
      resolve({
        status: 200,
        message: "Group created.",
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteGroup = (data) => {
  const { idUser, idGroup } = data;
  return new Promise(async (resolve, reject) => {
    try {
      await pool.execute("delete from department where id = ? and idUser = ?", [
        idGroup,
        idUser,
      ]);
      await pool.execute(
        "delete from userJoinDepartment where idDepartment = ? and idUser = ?",
        [idGroup, idUser]
      );
      resolve({
        status: 200,
        message: "Group deleted.",
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Path: Server/model/hendleDBUserModle.js
