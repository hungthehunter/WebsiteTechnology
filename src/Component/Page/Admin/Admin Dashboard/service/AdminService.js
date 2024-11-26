// ./service/apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

/*------------------------ Admin Dashboard -----------------------*/
                  /************* USER **************/

// GET: Function to get current account logged
export const getUserLogged = async () => {
  return axios.get(`${API_BASE_URL}/functions`);
};

                  /************* ACCESS **************/
// ADD: Function to create decentralization
export const createDecentralization = async (decentralizationData) => {
  return axios.post(`${API_BASE_URL}/decentralizations`, decentralizationData);
};

// UPDATE: Function to update decentralization
export const updateDecentralization = async (id,decentralizationData)=>{
  return axios.put(`${API_BASE_URL}/decentralizations/${id}`, decentralizationData);
}

// GET: Function to get decentralization
export const getDecentralization =async (id)=>{
  return axios.get(`${API_BASE_URL}/decentralizations/${id}`);
}

// GET: Function to get list of decentralization
export const getAllDecentralization =async ()=>{
  return axios.get(`${API_BASE_URL}/decentralizations`);
}

// GET: Function to get list of functions
export const getFunctions = async () => {
  return axios.get(`${API_BASE_URL}/functions`);
};

// GET: Function to get list of roles
export const getRoles = async () => {
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


                  /********** MANUFACTURER **********/

// ADD: Function to add new manufacturer
export const createManufacturer = async (manufacturerData) => {
  return axios.post(`${API_BASE_URL}/manufacturers`, manufacturerData);
};

// GET: Function to get list of manufacturers
export const getManufacturers = async () => {
  return axios.get(`${API_BASE_URL}/manufacturers`);
};

// GET: Function to get Manufacturer by Id
export const getManufacturerById = async (id) => {
  return axios.get(`${API_BASE_URL}/manufacturers/${id}`);
};

// DELETE: Function to delete employee by Id
export const deleteManufactuereId = async (id) => {
  return axios.delete(`${API_BASE_URL}/categories/${id}`);
}

                  /********** CATEGORY **********/

// ADD: Function to add new category
export const createCategory = async (categoryData) => {
  return axios.post(`${API_BASE_URL}/categories`, categoryData);
};

// GET: Function to get list of manufacturers
export const getCategorys = async () => {
  return axios.get(`${API_BASE_URL}/categories`);
};

// GET: Function to get manufacturers by id
export const getCategoryById = async (id) => {
  return axios.get(`${API_BASE_URL}/categories/${id}`);
};

// DELETE: Function to delete employee by Id
export const deleteCategoryId = async (id) => {
  return axios.delete(`${API_BASE_URL}/categories/${id}`);
}

                  /********** EMPLOYEE **********/

// ADD: Function to add new employee
export const createEmployee = async (userData) => {
  return axios.post(`${API_BASE_URL}/v1/admin`, userData);
};

// UPDATE: Function to update employee by id
export const updateEmployee = async (id,userData) => {
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
}

                  /********** ORDER **********/

// UPDATE: Function to update new order
export const updateOrderById = async (id,orderData) => {
  return axios.put(`${API_BASE_URL}/orders/${id}`, orderData);
};

// GET: Function to get list of orders
export const getOrders = async () => {
  return axios.get(`${API_BASE_URL}/orderDetails`);
};

// DELETE: Function to delete order by Id
export const deleteOrderById = async (id) => {
  return axios.delete(`${API_BASE_URL}/orders/${id}`);
}

                  /********** PRODUCT **********/

// ADD: Function to add new product
export const createProduct = async (userData) => {
  return axios.post(`${API_BASE_URL}/v1/admin`, userData);
};

// UPDATE: Function to update product by id
export const updateProduct = async (id,productData) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, productData);
};

// GET: Function to get list of products
export const getAllProducts = async () => {
  return axios.get(`${API_BASE_URL}/products`);
};

// GET: Function to get product by Id
export const getProductById = async (id) => {
  return axios.get(`${API_BASE_URL}/products/${id}`);
};

// DELETE: Function to delete product by Id
export const deleteProductById = async (id) => {
  return axios.delete(`${API_BASE_URL}/products/${id}`);
}

                  /********** CUSTOMER **********/

// ADD: Function to add new employee
export const createUser= async (userData) => {
  return axios.post(`${API_BASE_URL}/v1/admin`, userData);
};

// UPDATE: Function to update employee by id
export const updateUser = async (id,userData) => {
  return axios.put(`${API_BASE_URL}/v1/admin/${id}`,userData);
};

// GET: Function to get list of employees
export const getUser = async () => {
  return axios.get(`${API_BASE_URL}/v1/admin/listUsers`);
};

// GET: Function to get employee by Id
export const getUserById = async (id) => {
  return axios.get(`${API_BASE_URL}/v1/admin/${id}`);
};

// DELETE: Function to delete employee by Id
export const deleteUserById = async (id) => {
  return axios.delete(`${API_BASE_URL}/v1/admin/${id}`);
}

                  /********** PROMOTION **********/

// GET: Function to get list of promotions
export const getAllPromotion = async () => {
  return axios.get(`${API_BASE_URL}/promotions`);
};