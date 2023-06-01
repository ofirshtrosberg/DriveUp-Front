import { IP, PORT } from "@env";
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

export const getUserByEmail = async (email, userToken) => {
  console.log("getUserByEmail", email);
  console.log("getUserByEmail", userToken);
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/users/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data.result", data.result);
        resolve(data.result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

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

export const addUser = (
  email,
  password,
  phone,
  fullName,
  carModel,
  carColor,
  plateNumber
) => {
  fetch(`http://${IP}:${PORT}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        email: email,
        password: password,
        phone_number: phone,
        full_name: fullName,
        car_model: carModel,
        car_color: carColor,
        plate_number: plateNumber,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User added:", data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const createUserSubscription = (
  email,
  id,
  cardNumber,
  cvv,
  expMonth,
  expYear,
  userToken
) => {
  const date = new Date(expYear, expMonth, 1);
  fetch(`http://${IP}:${PORT}/user_subscription_maps/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
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
  });
};
export const getUsersSubscriptions = (userToken) => {
  fetch(`http://${IP}:${PORT}/user_subscription_maps/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const isUserPremium = (email, userToken, navigation) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/user_subscription_maps/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // if (response.status === 401) {
        //   console.log("401 error");
        //   navigation.navigate("Login");
        // }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        for (const user of data.result) {
          console.log(user);
          if (user.user_email === email) {
            resolve(true);
            return;
          }
        }
        resolve(false);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const deleteSubscription = (email, userToken) => {
  fetch(`http://${IP}:${PORT}/user_subscription_maps/${email}/Premium`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error);
  });
};

export const passengerOrderDrive = async (
  currentUserEmail,
  startLat,
  startLon,
  destinationLat,
  destinationLon,
  numberOfPassengers,
  userToken
) => {
  console.log(startLat, startLon, destinationLat, destinationLon);
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/passenger/order-drive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parameter: {
          startLat: parseFloat(startLat),
          startLon: parseFloat(startLon),
          destinationLat: parseFloat(destinationLat),
          destinationLon: parseFloat(destinationLon),
          numberOfPassengers: parseInt(numberOfPassengers),
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.orderId) {
          console.log("passengerOrderDrive", data.orderId);
          resolve(data.orderId);
        } else {
          reject(new Error("Order creation failed"));
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const getDriveByOrderId = async (orderId, userToken) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/passenger/get-drive/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.driveId !== undefined) {
          resolve(data.driveId);
        } else {
          reject(new Error("Drive check failed"));
        }
      })
      .catch((error) => {
        console.error("getDriveByOrderId", error);
        reject(error);
      });
  });
};
export const requestDrives = async (userToken, currLat, currLon) => {
  console.log("token", userToken);
  console.log("lt", currLat);
  console.log("ln", currLon);
  console.log(`http://${IP}:${PORT}/driver/request-drives`);
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/driver/request-drives`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentLat: currLat,
        currentLon: currLon,
        limits: {},
      }),
    })
      .then((response) => {
        console.log("hfghgh", response);
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const acceptDrive = (orderId, currUserEmail, userToken) => {
  fetch(`http://${IP}:${PORT}/driver/accept-drive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        order_id: orderId,
        email: currUserEmail,
      },
    }),
  });
};
export const rejectDrives = (currUserEmail, userToken) => {
  fetch(`http://${IP}:${PORT}/driver/reject-drives`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        currUserEmail: currUserEmail,
      },
    }),
  });
};

export const driveDetails = async (userToken, driveId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/driver/drive-details/${driveId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("driveDetails", data);
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
