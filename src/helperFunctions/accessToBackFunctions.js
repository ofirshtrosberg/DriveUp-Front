export const ip = "10.100.102.101";
export const getUsers = () => {
  fetch(`http://${ip}:8000/users/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteUser = (email) => {
  fetch(`http://${ip}:8000/users/${email}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error(error);
  });
};

export const getUserByEmail = (email) => {
  // var user = null;
  fetch(`http://${ip}:8000/users/${email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateUser = (
  email,
  fullName,
  carModel,
  carColor,
  plateNumber
) => {
  fetch(`http://${ip}:8000/users/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        full_name: fullName,
        car_model: carModel,
        car_color: carColor,
        plate_number: plateNumber,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data updated:", data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addUser = (
  email,
  password,
  phone,
  fullName,
  carModel,
  carColor,
  plateNumber
) => {
  fetch(`http://${ip}:8000/users/`, {
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
export const login = (email, password) => {
  fetch(`http://${ip}:8000/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parameter: {
        email: email,
        password: password,
      },
    }),
  });
};
export const createUserSubscription = (
  email,
  id,
  cardNumber,
  cvv,
  expMonth,
  expYear
) => {
  const date = new Date(expYear, expMonth, 1);
  console.log(date);
  fetch(`http://${ip}:8001/user_subscription_maps/`, {
    method: "POST",
    headers: {
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
export const getUsersSubscriptions = () => {
  fetch(`http://${ip}:8001/user_subscription_maps/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const isUserPremium = (email) => {
  fetch(`http://${ip}:8001/user_subscription_maps/`)
    .then((response) => response.json())
    .then((data) => {
      for(const user in data.result){
        if(user.email===email)
          return true;
      }
      return false
    })
    .catch((error) => {
      console.error(error);
    });
};
