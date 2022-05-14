import UserRepository from "../repositories/user.repository";

/**
 * Function to get user by id
 * @param req
 * @param res
 */
export const getUserById = async (req, res) => {
    if (req.params.userId) {
        try {
            const data = await UserRepository.getUserById(req.params.userId);
            res.json(data);
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to create user
 * @param req
 * @param res
 */
export const createUser = async (req, res) => {
    if (req.body) {
        try {
            const response = await UserRepository.createNewUser(req.body);
            if (response.success) {
                res.json(response);
            } else {
                throw new Error("Error in creating user");
            }
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to get all users of data base
 * @param req
 * @param res
 */
export const getUsers = async (req, res) => {
    try {
        const data = await UserRepository.getAllUsers();
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
};

/**
 * Function to delete user by id
 * @param req
 * @param res
 */
export const deleteUserById = async (req, res) => {
    if (req.params.userId) {
        try {
            const removedUser = await UserRepository.deleteUser(req.params.userId);
            res.json(removedUser);
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to get received messages
 * @param req
 * @param res
 */
export const getReceivedMessages = async (req, res) => {
    if (req.params.userId) {
        try {
            const data = await UserRepository.getReceivedMessages(req.params.userId);
            res.json(data);
        } catch (err) {
            res.json({message: err});
        }
    }
};

/**
 * Function to login
 * @param req
 * @param res
 */
export const loginUser = async (req, res) => {
    if (req.params.userId) {
        try {
            const logedUser = await UserRepository.loginUser(req.params.userId);
            if (logedUser[0]) {
                res.json({message: 'Welcome to your profile page.'});
            } else {
                res.json({message: "You do not exist in our base."});
            }

        } catch (e) {
            res.json({message: e});
        }
    }
};

/**
 * Function to logout the user
 * @param req
 * @param res
 */
export const logOutUser  = async (req, res) => {
  if(req.params.userId) {
      try {
          const logOutUser = await UserRepository.logOutUser(req.params.userId);
          if (logOutUser[0]) {
              res.json({message: 'Disconnect Bye!'});
          } else {
              res.json({message: "You do not exist in our database or you are not connected to deconnect! "});
          }
      } catch (e) {
          res.json({message: e});
      }
  }
};