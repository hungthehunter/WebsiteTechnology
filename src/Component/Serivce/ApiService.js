// ./service/apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

/*------------------------------------- Admin Dashboard ---------------------------------*/

/************* USER **************/

// POST: Function to create user 
export const createUser = async (userData) => {
  return axios.post(
    "http://localhost:8080/api/v1/admin",
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

// GET: Function to get user logged
export const getUserLogged = async (token) => {
  return axios.get(`${API_BASE_URL}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// GET: Function to get user logged By Id
export const getUserLoggedById = async (id) => {
  return axios.get(
    `http://localhost:8080/api/v1/admin/${id}`
  );
} 

// PUT: Function to update user logged
export const updateUserLogged = async (id , userData) => {
  return axios.put(`${API_BASE_URL}/v1/admin/update/${id}`,userData)
}

// DELETE: Function to delete user logged
export const deleteUserLogged = async (id) => {
  return axios.delete(`${API_BASE_URL}/api/v1/admin/${id}`)
}



/************* ADDRESS **************/

// POST: Function to create address
export const createAddress = async (addressData) => {
  return axios.post(`${API_BASE_URL}/address`,addressData);
};

// GET: Function to get list of addresses
export const getAllAddress = async () => {
  return axios.get(`${API_BASE_URL}/address`);
};

// GET: Function to get address
export const getAddress = async (id) => {
  return axios.get(`${API_BASE_URL}/address/${id}`);
};

// PUT: Function to update address
export const updateAddress = async (id) => {
  return axios.put(`${API_BASE_URL}/address/${id}`);
};

// DELETE: Function to delete address
export const deleteAddress = async (id) => {
  return axios.delete(`${API_BASE_URL}/address/${id}`);
};

/************* CART **************/
// GET: Function to get cart
export const getCartById = async(id) =>{
   return axios.get(`${API_BASE_URL}/carts/cart/${id}`)
}

/************* ACCESS **************/
// POST: Function to create decentralization
export const createDecentralization = async (decentralizationData) => {
  return axios.post(`${API_BASE_URL}/decentralizations`, decentralizationData);
};

// PUT: Function to update decentralization
export const updateDecentralization = async (id, decentralizationData) => {
  return axios.put(
    `${API_BASE_URL}/decentralizations/${id}`,
    decentralizationData
  );
};

// GET: Function to get decentralization
export const getDecentralization = async (id) => {
  return axios.get(`${API_BASE_URL}/decentralizations/${id}`);
};

// GET: Function to get list of decentralization
export const getAllDecentralization = async () => {
  return axios.get(`${API_BASE_URL}/decentralizations`);
};

// GET: Function to get list of roles
export const getRoles = async () => {
  return axios.get(`${API_BASE_URL}/accesses`);
};

// GET: Function to get list of roles
export const getAllRole = async () => {
  return axios.get(`${API_BASE_URL}/accesses`);
};

// DELETE: Function to delete accesses
export const deleteAccesses = async (id) => {
  return axios.delete(`${API_BASE_URL}/accesses/${id}`);
};

// DELETE: Function to create decentralization
export const deleteDecentralization = async (id) => {
  return axios.delete(`${API_BASE_URL}/decentralizations/${id}`);
};

/********** FUNCTION **********/

// GET: Function to get list of functions
export const getAllFunction = async () => {
  return axios.get(`${API_BASE_URL}/functions`);
};

// GET: Function to get function
export const getFunctionById = async (id) => {
  return axios.get(`${API_BASE_URL}/functions/${id}`);
}

// // DELETE: Function to delete function
export const deleteFunction = async (id) => {
  return axios.delete(`${API_BASE_URL}/functions/${id}`);
}

/********** MANUFACTURER **********/

// POST: Function to add new manufacturer
export const createManufacturer = async (manufacturerData) => {
  return axios.post(`${API_BASE_URL}/manufacturers`, manufacturerData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// PUT: Function to update manufacturer
export const updateManufacturer = async (id,manufacturerData) => {
  return axios.put(`${API_BASE_URL}/manufacturers/${id}`,manufacturerData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
}

// GET: Function to get list of manufacturers
export const getAllManufacturer = async () => {
  return axios.get(`${API_BASE_URL}/manufacturers`);
};

// GET: Function to get Manufacturer by Id
export const getManufacturerById = async (id) => {
  return axios.get(`${API_BASE_URL}/manufacturers/${id}`);
};

// DELETE: Function to delete employee by Id
export const deleteManufactuereId = async (id) => {
  return axios.delete(`${API_BASE_URL}/manufacturers/${id}`);
};

/********** CATEGORY **********/

// POST: Function to add new category
export const createCategory = async (categoryData) => {
  return axios.post(`${API_BASE_URL}/categories`, categoryData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

  );
};

// GET: Function to get list of categories
export const getAllCategory = async () => {
  return axios.get(`${API_BASE_URL}/categories`);
};

// GET: Function to get category by id
export const getCategoryById = async (id) => {
  return axios.get(`${API_BASE_URL}/categories/${id}`);
};

// PUT: Function to update category
export const updateCategory = async (id,categoryData) =>{
   return axios.put(`${API_BASE_URL}/categories/${id}`,categoryData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
   )
}


// DELETE: Function to delete employee by Id
export const deleteCategoryId = async (id) => {
  return axios.delete(`${API_BASE_URL}/categories/${id}`);
};

/********** EMPLOYEE **********/

// POST: Function to add new employee
export const createEmployee = async (userData) => {
  return axios.post(`${API_BASE_URL}/v1/admin`, userData);
};

// PUT: Function to update employee by id
export const updateEmployee = async (id, userData) => {
  return axios.put(`${API_BASE_URL}/v1/admin/listEmployees/${id}`, userData);
};

// GET: Function to get list of employees
export const getEmployees = async () => {
  return axios.get(`${API_BASE_URL}/v1/admin/listUsers`);
};

// GET: Function to get employee by Id
export const getEmployeeById = async (id) => {
  return axios.get(`${API_BASE_URL}/v1/admin/${id}`);
};

// DELETE: Function to delete employee by Id
export const deleteEmployeeById = async (id) => {
  return axios.delete(`${API_BASE_URL}/v1/admin/${id}`);
};

/********** ORDER **********/

// PUT: Function to update new order
export const updateOrderById = async (id, orderData) => {
  return axios.put(`${API_BASE_URL}/orders/${id}`, orderData);
};

// GET: Function to get list of orders
export const getAllOrder = async () => {
  return axios.get(`${API_BASE_URL}/orderDetails`);
};

// DELETE: Function to delete order by Id
export const deleteOrderById = async (id) => {
  return axios.delete(`${API_BASE_URL}/orders/${id}`);
};

/********** PRODUCT **********/

// POST: Function to add new product
export const createProduct = async (userData) => {
  return axios.post(`${API_BASE_URL}/v1/admin`, userData);
};

// PUT: Function to update product by id
export const updateProduct = async (id, productData) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, productData);
};

// GET: Function to get list of products
export const getAllProduct = async () => {
  return axios.get(`${API_BASE_URL}/products`);
};

// GET: Function to get product by Id
export const getProductById = async (id) => {
  return axios.get(`${API_BASE_URL}/products/${id}`);
};

// DELETE: Function to delete product by Id
export const deleteProductById = async (id) => {
  return axios.delete(`${API_BASE_URL}/products/${id}`);
};

/********** CUSTOMER **********/

// PUT: Function to update employee by id
export const updateUser = async (id, userData) => {
  return axios.put(`${API_BASE_URL}/v1/admin/${id}`, userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// GET: Function to get list of employees
export const getAllUser = async () => {
  return axios.get(`${API_BASE_URL}/v1/admin/listUsers`);
};

// GET: Function to get employee by Id
export const getUserById = async (id) => {
  return axios.get(`${API_BASE_URL}/v1/admin/${id}`);
};

// DELETE: Function to delete employee by Id
export const deleteUserById = async (id) => {
  return axios.delete(`${API_BASE_URL}/v1/admin/${id}`);
};

/********** PROMOTION **********/

// GET: Function to get list of promotions
export const getAllPromotion = async () => {
  return axios.get(`${API_BASE_URL}/promotions`);
};

/*------------------------------------- Admin History ---------------------------------*/

/************* ACCOUNT DETAIL **************/

// GET: Function to get current account detail

export const getAccountDetail = async (token) => {
  return axios.get("http://localhost:8080/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/************* ACCOUNT POSTRESS **************/

// POST: Function to add

export const addNewAddress = async (newAddress) => {
  return axios.post(`http://localhost:8080/api/address`, newAddress, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

// GET: Function to get current account detail

export const getAccountAddress = async (token) => {
  return axios.get("http://localhost:8080/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/************* ACCOUNT ORDER **************/

// GET: Function to get current account detail

export const getAccountOrder = async (token) => {
  return axios.get("http://localhost:8080/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// GET: Function to get account's purchase history

export const getPurchaseHistories = async (userId) => {
  return axios.get(
    `http://localhost:8080/api/purchaseHistories/user/${userId}`
  );
};

// GET: Function to get account's purchase history

export const getOrder = async (userId) => {
  return axios.get(`http://localhost:8080/api/orders/userId/${userId}`);
};

// DELETE: Function to delete account's purchase history

export const deletePurchaseHistories = async (userId) => {
  return axios.delete(
    `http://localhost:8080/api/purchaseHistories/user/${userId}`
  );
};

/************* ACCOUNT PRODUCT HISTORY **************/

// GET: Function to get account's purchase history

export const getAccountProductHistory = async (userId) => {
  return axios.get(`http://localhost:8080/api/carts/cart/${userId}`);
};

// GET: Function to get product seen in Shop

export const getProductSeen = async (userId) => {
  return axios.get(`http://localhost:8080/api/carts/cart/${userId}`);
};