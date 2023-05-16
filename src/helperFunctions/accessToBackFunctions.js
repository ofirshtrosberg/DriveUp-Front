import { IP, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// export const getUsers = () => {
//   fetch(`http://${IP}:${PORT}/users/`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export const deleteUser = (email) => {
//   fetch(`http://${IP}:${PORT}/users/${email}`, {
//     method: "DELETE",
//   }).catch((error) => {
//     console.error(error);
//   });
// };

// export const getUserByEmail = (email) => {
//   fetch(`http://${IP}:${PORT}/users/${email}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export const updateUser = (
//   email,
//   fullName,
//   carModel,
//   carColor,
//   plateNumber
// ) => {
//   fetch(`http://${IP}:${PORT}/users/${email}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       parameter: {
//         full_name: fullName,
//         car_model: carModel,
//         car_color: carColor,
//         plate_number: plateNumber,
//       },
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Data updated:", data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export const addUser = (
//   email,
//   password,
//   phone,
//   fullName,
//   carModel,
//   carColor,
//   plateNumber
// ) => {
//   fetch(`http://${IP}:${PORT}/users/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       parameter: {
//         email: email,
//         password: password,
//         phone_number: phone,
//         full_name: fullName,
//         car_model: carModel,
//         car_color: carColor,
//         plate_number: plateNumber,
//       },
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("User added:", data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// export const login = (email, password) => {
//   fetch(`http://${IP}:${PORT}/users/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       parameter: {
//         email: email,
//         password: password,
//       },
//     }),
//   });
// };
export const createUserSubscription = async (
  email,
  id,
  cardNumber,
  cvv,
  expMonth,
  expYear
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("token=", token);
    const date = new Date(expYear, expMonth, 1);
    const response = await fetch(
      `http://${IP}:${PORT}/user_subscription_maps/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parameter: {
            subscription_name: "Premium",
            user_email: email,
            card_owner_id: id,
            card_number: cardNumber,
            cvv: cvv,
            start_date: null,
            expiration_date: date,
          },
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// export const getUsersSubscriptions = () => {
//   fetch(`http://${IP}:${PORT}/user_subscription_maps/`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
export const isUserPremium = async (email) => {
  console.log("ggggg")
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("token=", token);
    const response = await fetch(
      `http://${IP}:${PORT}/user_subscription_maps/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    for (const user in data.result) {
      if (user.email === email) return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};
export const deleteSubscription = async (email) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("token=", token);
    const response = await fetch(
      `http://${IP}:${PORT}/user_subscription_maps/${email}/Premium`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const passengerOrderDrive = async (
  currentUserEmail,
  startLat,
  startLon,
  destinationLat,
  destinationLon,
  numberOfPassengers
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("token=", token);

    const response = await fetch(`http://${IP}:${PORT}/passenger/order-drive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          currentUserEmail: currentUserEmail,
          startLat: parseFloat(startLat),
          startLon: parseFloat(startLon),
          destinationLat: parseFloat(destinationLat),
          destinationLon: parseFloat(destinationLon),
          numberOfPassengers: parseInt(numberOfPassengers),
        },
      }),
    });
    console.log(response);
    // const data = await response.json();
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getDriveByOrderId = (orderId) => {
  fetch(`http://${IP}:${PORT}/passenger/get-drive/${orderId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

//driver:
export const requestDrives = (currUserEmail, currLat, currLon) => {
  fetch(`http://${IP}:${PORT}/driver/request-drives`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        currUserEmail: currUserEmail,
        currLat: currLat,
        currLon: currLon,
      },
    }),
  });
};
export const acceptDrive = (driveId, currUserEmail) => {
  fetch(`http://${IP}:${PORT}/driver/accept-drive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        driveId: driveId,
        currUserEmail: currUserEmail,
      },
    }),
  });
};
export const rejectDrives = (currUserEmail) => {
  fetch(`http://${IP}:${PORT}/driver/reject-drives`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        currUserEmail: currUserEmail,
      },
    }),
  });
};
