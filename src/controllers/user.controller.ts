import UserRepository from "../repositories/user.repository";

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

export const createUser = async (req, res) => {
    if (req.body) {
        try {
            const response = await UserRepository.createNewUser(req.body);
            if (response.success) {
                res.json(response);
            } else {
                throw new Error("Erreur de création de l'utilisateur");
            }
        } catch (err) {
            res.json({message: err});
        }
    }
};

export const getUsers = async (req, res) => {
    try {
        const data = await UserRepository.getAllUsers();
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
};

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

export const loginUser = async (req, res) => {
    if (req.params.userId) {
        try {
            const logedUser = await UserRepository.loginUser(req.params.userId);
            if (logedUser[0]) {
                res.json({message: 'Bienvenue dans votre espace profil'});
            } else {
                res.json({message: "Vous n'existez pas dans notre base"});
            }

        } catch (e) {
            res.json({message: e});
        }
    }
};

export const logOutUser  = async (req, res) => {
  if(req.params.userId) {
      try {
          const logOutUser = await UserRepository.logOutUser(req.params.userId);
          if (logOutUser[0]) {
              res.json({message: 'Deconnecte Bye!'});
          } else {
              res.json({message: "Vous n'existez pas dans notre base de donées ou vous n'etes pas connecté ! "});
          }
      } catch (e) {
          res.json({message: e});
      }
  }
};