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

export const passengerOrderDrive = (
  currentUserEmail,
  startLat,
  startLon,
  destinationLat,
  destinationLon,
  numberOfPassengers,
  userToken
) => {
  console.log(userToken);
  fetch(`http://${IP}:${PORT}/passenger/order-drive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
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
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.orderId) {
        console.log(data.orderId);
        return data.orderId;
      } else {
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getDriveByOrderId = (orderId) => {
  // fetch(`http://${IP}:${PORT}/passenger/get-drive/${orderId}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

//driver:
export const requestDrives = (currUserEmail, currLat, currLon) => {
  // fetch(`http://${IP}:${PORT}/driver/request-drives`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     parameter: {
  //       currUserEmail: currUserEmail,
  //       currLat: currLat,
  //       currLon: currLon,
  //     },
  //   }),
  // });
};
export const acceptDrive = (driveId, currUserEmail) => {
  // fetch(`http://${IP}:${PORT}/driver/accept-drive`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     parameter: {
  //       driveId:driveId,
  //       currUserEmail: currUserEmail,
  //     },
  //   }),
  // });
};
export const rejectDrives = (currUserEmail) => {
  // fetch(`http://${IP}:${PORT}/driver/reject-drives`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     parameter: {
  //       currUserEmail: currUserEmail,
  //     },
  //   }),
  // });
};
