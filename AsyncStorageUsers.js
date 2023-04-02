import AsyncStorage from "@react-native-async-storage/async-storage";

export const addUserLocal = async (user) => {
  try {
    const usersAlreadyInDB = await getUsersLocal();
    const usersAfterAdding = [...usersAlreadyInDB, user];

    await AsyncStorage.setItem("users", JSON.stringify(usersAfterAdding));
  } catch (error) {
    console.log(error);
  }
};

export const getUsersLocal = async () => {
  try {
    const usersInDB = await AsyncStorage.getItem("users");
    if (usersInDB === null) {
      return [];
    }
    const users = JSON.parse(usersInDB);
    return users;
  } catch (error) {
    console.log(error);
  }
};
export const printUsersLocal = async () => {
  try {
    const users = await getUsersLocal();
    if (users === null) {
      console.log("empty");
    } else {
      users.forEach((user) => console.log(user));
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateUserLocal = async (user) => {
  try {
    const usersAlreadyInDB = await getUsersLocal();

    const foundUserIndex = usersAlreadyInDB.findIndex(
      (currUser) => currUser.email === user.email
    );

    if (foundUserIndex === -1) {
      const usersAfterUpdate = [...usersAlreadyInDB, user];
      await AsyncStorage.setItem("users", JSON.stringify(usersAfterUpdate));
    } else {
      usersAlreadyInDB[foundUserIndex] = {
        ...usersAlreadyInDB[foundUserIndex],
        ...user,
      };
      await AsyncStorage.setItem("users", JSON.stringify(usersAlreadyInDB));
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserLocal = async (email) => {
  try {
    const usersAlreadyInDB = await getUsersLocal();
    const filteredUsers = usersAlreadyInDB.filter(
      (user) => user.email !== email
    );
    await AsyncStorage.setItem("users", JSON.stringify(filteredUsers));
  } catch (error) {
    console.log(error);
  }
};
