import AsyncStorage from "@react-native-async-storage/async-storage";

export const addUserLocal = async (user) => {
  try {
    const existingUsers = await getUsersLocal();
    const updatedUsers = [...existingUsers, user];

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
  } catch (error) {
    console.log(error);
  }
};

export const getUsersLocal = async () => {
  try {
    const usersJSON = await AsyncStorage.getItem("users");
    if (usersJSON === null) {
      return [];
    }
    const users = JSON.parse(usersJSON);
    return users;
  } catch (error) {
    console.log(error);
  }
};
export const printUsersLocal = async () => {
  try {
    const users = await getUsersLocal();
    users.forEach((user) => console.log(user));
  } catch (error) {
    console.log(error);
  }
};
export const updateUserLocal = async (user) => {
  try {
    const existingUsers = await getUsersLocal();

    const existingUserIndex = existingUsers.findIndex(
      (currUser) => currUser.email === user.email
    );

    if (existingUserIndex === -1) {
      const updatedUsers = [...existingUsers, user];
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      existingUsers[existingUserIndex] = {
        ...existingUsers[existingUserIndex],
        ...user,
      };
      await AsyncStorage.setItem("users", JSON.stringify(existingUsers));
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserLocal = async (email) => {
  try {
    const existingUsers = await getUsersLocal();
    const updatedUsers = existingUsers.filter((u) => u.email !== email);
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
  } catch (error) {
    console.log(error);
  }
};
