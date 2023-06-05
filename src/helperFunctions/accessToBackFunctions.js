import { IP, PORT } from "@env";

// !!!! check 401
export const getUserByEmail = async (email, userToken, navigation) => {
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
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
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

//  401 is checked
export const createUserSubscription = (
  email,
  id,
  cardNumber,
  cvv,
  expMonth,
  expYear,
  userToken,
  navigation
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
  })
    .then((response) => {
      if (response.status === 401) {
        navigation.navigate("Login");
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//401 is checked
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
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
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
        // console.error(error);
        reject(error);
      });
  });
};

// 401 is checked
export const deleteSubscription = (email, userToken, navigation) => {
  fetch(`http://${IP}:${PORT}/user_subscription_maps/${email}/Premium`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 401) {
        navigation.navigate("Login");
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
};

//  401 is checked
export const passengerOrderDrive = async (
  currentUserEmail,
  startLat,
  startLon,
  destinationLat,
  destinationLon,
  numberOfPassengers,
  userToken,
  navigation
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
      .then((response) => {
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
        return response.json();
      })
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
//  401 is checked
export const getDriveByOrderId = async (orderId, userToken, navigation) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/passenger/get-drive/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
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
        console.error(error);
        reject(error);
      });
  });
};
// 401 is checked
export const requestDrives = async (
  userToken,
  currLat,
  currLon,
  limits,
  navigation
) => {
  console.log("limits:", limits);
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
        limits: limits,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
        console.log("response in requestDrives", response);
        return response.json();
      })
      .then((data) => {
        console.log("data in requestDrives", data);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// !!!! need to check 401
export const acceptDrive = (orderId, currUserEmail, userToken, navigation) => {
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
  })
    .then((response) => {
      if (response.status === 401) {
        navigation.navigate("Login");
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
};
// !!!! need to check 401
export const rejectDrives = (currUserEmail, userToken, navigation) => {
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
  })
    .then((response) => {
      if (response.status === 401) {
        navigation.navigate("Login");
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
};
// !!!! need to check 401
export const driveDetails = async (userToken, driveId, navigation) => {
  console.log("drive details");
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/driver/drive-details/${driveId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigation.navigate("Login");
          throw new Error("your token expired or invalid please login");
        }
        console.log("drive details response", response);
        return response.json();
      })
      .then((data) => {
        console.log("driveDetails data", data);
        resolve(data);
      })
      .catch((error) => {
        console.error("drive details error", error);
        reject("drive details error", error);
      });
  });
};
