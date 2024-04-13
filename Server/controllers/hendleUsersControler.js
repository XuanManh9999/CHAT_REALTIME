import * as modlesUsers from "../model/hendleDBUserModle.js";

const getAllUsers = async (_, res) => {
  try {
    const users = await modlesUsers.getAllUsers();
    if (users.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No user found.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "All users.",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to get all users.",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await modlesUsers.getUser(id);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Id is required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to get user.",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if ((email, password, username)) {
      const user = await modlesUsers.addUser(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to add user.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, email, password, age, avatar, address, desc } = req.body;
    if (id && password && email && age && avatar && address && desc) {
      const user = await modlesUsers.updateUser(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to update user.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await modlesUsers.deleteUser(id);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Id is required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to delete user.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await modlesUsers.login(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to login.",
    });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const response = await modlesUsers.ForgotPassword(email);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({
        status: 400,
        message: "The user has not entered enough information to continue",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred on the server",
    });
  }
};

const addFriend = async (req, res) => {
  try {
    const { id, idFriend } = req.body;
    if (id && idFriend) {
      const user = await modlesUsers.addFriend(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to add friend.",
    });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { id, idFriend } = req.body;
    if (id && idFriend) {
      const user = await modlesUsers.deleteFriend(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to delete friend.",
    });
  }
};

const getFriends = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await modlesUsers.getFriends(id);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "Id is required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to get friends.",
    });
  }
};

const getDataChat = async (req, res) => {
  try {
    const { id, idFriend } = req.body;
    if (id && idFriend) {
      const user = await modlesUsers.getDataChat(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to get data chat.",
    });
  }
};

const createGroup = async (req, res) => {
  try {
    const { idUser, fullName, author, desc } = req.body;
    if (idUser && fullName && author && desc) {
      const user = await modlesUsers.createGroup(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to create group.",
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { idUser, idGroup } = req.body;
    if (idUser && idGroup) {
      const user = await modlesUsers.deleteGroup(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        status: 400,
        message: "data are required.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while trying to delete group.",
    });
  }
};

export {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  ForgotPassword,
  addFriend,
  deleteFriend,
  getFriends,
  getDataChat,
  createGroup,
  deleteGroup,
};
