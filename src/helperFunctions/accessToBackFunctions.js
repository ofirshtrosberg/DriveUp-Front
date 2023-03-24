const ip = "10.100.102.101";

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
  fetch(`http://${ip}:8000/users/${email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
  })
};
