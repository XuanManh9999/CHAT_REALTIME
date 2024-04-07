import { pool } from "../config/connectDB.js";
import nodemailer from "nodemailer";

import bcrypt from "bcrypt";

export const getAllUsers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [results] = await pool.execute("select * from useraccount");
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
  const { email, password, age, avatar, address, desc } = data;
  const hash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
  return new Promise(async (resolve, reject) => {
    try {
      await pool.execute(
        "insert into useraccount (email, password, age, avatar, address, desc) values (?, ?, ?, ?, ?, ?)",
        [email, hash, age, avatar, address, desc]
      );
      resolve({
        status: 200,
        message: "User added.",
      });
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
      const IsCheckPassword = bcrypt.compareSync(password, results[0].password);
      // so sánh password
      if (!IsCheckPassword) {
        resolve({
          status: 401,
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
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "", // email của bạn
          pass: "", // mật khẩu của bạn
        },
      });
      const mailOptions = {
        from: "", // email của bạn
        to: email,
        subject: "Reset password",
        text: "That was easy!",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      resolve({
        status: 200,
        message: "Email sent.",
      });
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
