const { default: knex } = require("knex");
const path = require("path");
const dbConnection = require("../libs/knex");
const errorObj = require("../utils/errorObj");

const searchQuary = async (data) => {
  let { type } = data;
  type = type ? [type] : ["Dog", "Cat", "Other"];
  if (Object.keys(data).length === 1) {
    const basicSearch = await dbConnection.from("pets").whereIn("type", type);
    return basicSearch;
  }
  const defaultStatus = ["Adopted", "Available", "Fostered"];
  let { status = defaultStatus, name = "", weight, height } = data;

  const advancedSearch = await dbConnection
    .from("pets")
    .whereBetween("weight", [Number(weight[0]), Number(weight[1])])
    .whereBetween("height", [Number(height[0]), Number(height[1])])
    .whereIn("status", status)
    .whereILike("name", `%${name}%`)
    .whereIn("type", type);
  return advancedSearch;
};
const getSearchedPetsModel = async (data, next) => {
  try {
    const searchedPets = await searchQuary(data);
    return searchedPets;
  } catch (err) {
    errorObj(500, "Error getting searched pets from db", next);
  }
};
const getPetsModel = async (req, next) => {
  try {
    const { offset } = req.params;
    const pets = await dbConnection
      .from("pets")
      .offset(offset)
      .limit(10)
      .orderBy("id", "asc");
    const total_count = await dbConnection.from("pets").count();
    const data = {
      list: pets,
      total_count: total_count[0]["count(*)"],
      offset: Number(offset),
    };
    return data;
  } catch (err) {
    errorObj(500, "Error getting pets from db", next);
  }
};

const getPetByIdModel = async (id, next) => {
  try {
    const pet = await dbConnection.from("pets").where({ id: id });
    return pet;
  } catch (err) {
    errorObj(500, "Error getting pet by id from db", next);
  }
};

const addPetModel = async (newPet, next) => {
  try {
    const [id] = await dbConnection.from("pets").insert(newPet);
    return id;
  } catch (err) {
    errorObj(500, "Error adding pet to db", next);
  }
};
const adoptPetModel = async (id, userId, status, next) => {
  try {
    const adopted = await dbConnection
      .from("pets")
      .update({ ownerId: userId, status: status })
      .where({ id: id });
    return adopted;
  } catch (err) {
    errorObj(500, "Error updating pet's status and owner", next);
  }
};
const returnPetModel = async (id, status, next) => {
  try {
    const returned = await dbConnection
      .from("pets")
      .update({ ownerId: null, status: status })
      .where({ id: id });
    return returned;
  } catch (err) {
    errorObj(
      500,
      "Error updating pet's status and owner while returning it",
      next
    );
  }
};
const savePetModel = async (id, userId, next) => {
  try {
    const [petSaved] = await dbConnection
      .from("savedPets")
      .insert({ petId: id, userId: userId });
    return petSaved;
  } catch (err) {
    errorObj(500, "Error saving pet to db", next);
  }
};
const deleteSavedPetModel = async (id, userId, next) => {
  try {
    const deleteSavedPet = await dbConnection
      .from("savedPets")
      .where({ petId: id, userId: userId })
      .del();
    return deleteSavedPet;
  } catch (err) {
    errorObj(500, "Error deleting saved pet from savedPets table", next);
  }
};

const editPetModel = async (id, data, next) => {
  try {
    const editedPet = await dbConnection
      .from("pets")
      .update(data)
      .where({ id: id });
    return editedPet;
  } catch (err) {
    errorObj(500, "Error editing pet from db", next);
  }
};
const getUserPetsModel = async (id, next) => {
  try {
    const userPets = await dbConnection
      .from("pets")
      .select("*")
      .where({ ownerId: id });
    return userPets;
  } catch (err) {
    errorObj(500, "Error getting user's pets from db", next);
  }
};
const getUserSavedPetsModel = async (id, next) => {
  try {
    const savedPets = await dbConnection("savedPets")
      .join("pets", "pets.id", "savedPets.petId")
      .select("*")
      .where("savedPets.userId", id);
    return savedPets;
  } catch (err) {
    errorObj(500, "Error getting user's saved pets from db", next);
  }
};
module.exports = {
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
};
