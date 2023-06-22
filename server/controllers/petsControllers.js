const {
  addPetModel,
  getSearchedPetsModel,
  getPetByIdModel,
  editPetModel,
  savePetModel,
  adoptPetModel,
  returnPetModel,
  getUserPetsModel,
  deleteSavedPetModel,
  getUserSavedPetsModel,
  getPetsModel,
} = require("../models/petsModel");
const errorObj = require("../utils/errorObj");

const getPets = async (req, res, next) => {
  try {
    const pets = await getPetsModel(req, next);
    res.send(pets);
  } catch (err) {
    errorObj(500, "Error getting pets", next);
  }
};

const getSearchedPets = async (req, res, next) => {
  try {
    const searchedPets = await getSearchedPetsModel(req.query, next);
    res.send(searchedPets);
  } catch (err) {
    errorObj(500, "Error getting pets", next);
  }
};

const postPet = async (req, res, next) => {
  try {
    const id = await addPetModel(req.body, next);
    if (id) {
      const newPet = {
        ...req.body,
        id: id,
      };
      res.send(newPet);
    }
  } catch (err) {
    errorObj(500, "Error adding pet", next);
  }
};
const getPetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const found = await getPetByIdModel(id, next);
    res.send(found);
  } catch (err) {
    errorObj(500, "Error getting pet", next);
  }
};
const editPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pet = await editPetModel(id, req.body, next);
    if (pet) {
      const editedPet = {
        ...req.body,
        id: id,
      };
      res.send(editedPet);
    }
  } catch (err) {
    errorObj(500, "Error editing pet", next);
  }
};
const savePet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const savedPetId = await savePetModel(id, userId);
    if (savedPetId) {
      const savedPet = await getPetByIdModel(savedPetId);
      res.send(savedPet);
    }
  } catch (err) {
    errorObj(500, "Error saving pet", next);
  }
};
const deleteSavedPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const deleted = await deleteSavedPetModel(id, userId);
    if (deleted) {
      res.send(id);
    }
  } catch (err) {
    errorObj(500, "Error removing saved pet from saved list", next);
  }
};
const adoptPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, userId } = req.body;
    const adoptedId = await adoptPetModel(id, userId, status, next);
    if (adoptedId) {
      const adoptedPet = await getPetByIdModel(id);
      res.send(adoptedPet);
    } else {
      errorObj(500, "Error adopting pet", next);
    }
  } catch (err) {
    errorObj(500, "Error adopting pet", next);
  }
};
const returnPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const returnedPetId = await returnPetModel(id, status, next);
    if (!returnedPetId) errorObj(500, "Error returning pet", next);
    const returnedPet = await getPetByIdModel(id, next);
    if (!returnedPet) errorObj(500, "Error returning pet", next);
    res.send(returnedPet);
  } catch (err) {
    errorObj(500, "Error returning pet", next);
  }
};

const getUserPets = async (req, res) => {
  try {
    const id = req.params.id;
    const userPets = await getUserPetsModel(id);
    const savedPets = await getUserSavedPetsModel(id);
    res.send({ userPets, savedPets });
  } catch (err) {
    errorObj(500, "Error getting user pets", next);
  }
};

module.exports = {
  getPets,
  getSearchedPets,
  postPet,
  getPetById,
  editPet,
  savePet,
  adoptPet,
  returnPet,
  getUserPets,
  deleteSavedPet,
};
