import { IP, PORT } from "@env";
import * as FileSystem from "expo-file-system";
export const downloadImage = async (imageProfile, setImageUri) => {
  try {
    const response = await fetch("http://" + IP + ":" + PORT + imageProfile);
    console.log("download image", response);
    if (!response.ok) {
      throw new Error("Failed to download image");
    }
    const timestamp = Date.now();
    const imageUri = `${FileSystem.documentDirectory}image_${timestamp}.png`;
    await FileSystem.downloadAsync(response.url, imageUri);
    setImageUri(imageUri);
  } catch (error) {
    console.error(error);
  }
};

export const clearStackAndNavigate = (navigation, screenName) => {
  navigation.reset({
    index: 0,
    routes: [{ name: screenName }],
  });
};

export const getUserByEmail = async (email, userToken, navigation, logout) => {
  console.log("getUserByEmail email", email);
  console.log("getUserByEmail token", userToken);
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
          clearStackAndNavigate(navigation, "Login");
          logout();
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

export const createUserSubscription = (
  email,
  id,
  cardNumber,
  cvv,
  expMonth,
  expYear,
  userToken,
  navigation,
  logout
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
        clearStackAndNavigate(navigation, "Login");
        logout();
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const isUserPremium = (email, userToken, navigation, logout) => {
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
          clearStackAndNavigate(navigation, "Login");
          logout();
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
        console.error(error);
        reject(error);
      });
  });
};

export const deleteSubscription = (email, userToken, navigation, logout) => {
  fetch(`http://${IP}:${PORT}/user_subscription_maps/${email}/Premium`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 401) {
        clearStackAndNavigate(navigation, "Login");
        logout();
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
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
  userToken,
  navigation,
  logout
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
          clearStackAndNavigate(navigation, "Login");
          logout();
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

export const getDriveByOrderId = async (
  orderId,
  userToken,
  navigation,
  logout
) => {
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
          clearStackAndNavigate(navigation, "Login");
          logout();
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
// !!! check 401
export const getEstimatedTime = async (
  orderId,
  userToken,
  navigation,
  logout
) => {
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
          clearStackAndNavigate(navigation, "Login");
          logout();
          throw new Error("your token expired or invalid please login");
        }
        return response.json();
      })
      .then((data) => {
        if (data.estimatedDriverArrival !== undefined) {
          resolve(data.estimatedDriverArrival);
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

export const requestDrives = async (
  userToken,
  currLat,
  currLon,
  limits,
  navigation,
  logout
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
          clearStackAndNavigate(navigation, "Login");
          logout();
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
        console.error(error);
        reject(error);
      });
  });
};
// !! check 401
export const acceptDrive = (orderId, userToken, navigation, logout) => {
  fetch(`http://${IP}:${PORT}/driver/accept-drive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: orderId,
    }),
  })
    .then((response) => {
      console.log("accept drive res", response);
      if (response.status === 401) {
        clearStackAndNavigate(navigation, "Login");
        logout();
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {
      console.log("data accept drive", data);
      if (data.success !== true) {
        navigation.goBack();
      }
    })
    .catch((error) => {
      navigation.goBack();
      console.error(error);
    });
};

// !!!! need to check 401
export const driveDetails = async (userToken, driveId, navigation, logout) => {
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
          clearStackAndNavigate(navigation, "Login");
          logout();
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
// !!!check 401
export const driveDetailsPreview = async (
  userToken,
  driveId,
  navigation,
  logout
) => {
  console.log("drive details");
  return new Promise((resolve, reject) => {
    fetch(`http://${IP}:${PORT}/driver/drive-details-preview/${driveId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          clearStackAndNavigate(navigation, "Login");
          logout();
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
// !!! check 401
export const finishDrive = (driveId, userToken, navigation, logout) => {
  fetch(`http://${IP}:${PORT}/driver/finish-drive/${driveId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("accept drive res", response);
      if (response.status === 401) {
        clearStackAndNavigate(navigation, "Login");
        logout();
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
};
// !!! check 401
export const cancelOrder = async (orderId, userToken, navigation, logout) => {
  fetch(`http://${IP}:${PORT}/passenger/cancel-order/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("cancel drive res", response);
      if (response.status === 401) {
        clearStackAndNavigate(navigation, "Login");
        logout();
        throw new Error("your token expired or invalid please login");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success === true) {
        navigation.goBack();
        resolve(true);
      }
      resolve(false);
    })
    .catch((error) => {
      console.log(error);
    });
};
