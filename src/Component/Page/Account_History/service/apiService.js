// ./service/apiService.js

import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api";

/*------------------------ Admin History -----------------------*/
                  /************* ACCOUNT DETAIL **************/

// GET: Function to get current account detail

export const getAccountDetail = async (token) => {
    return  axios.get(
        "http://localhost:8080/api/v1/auth/me",
        {
         headers: {
         Authorization: `Bearer ${token}`,
         },
        }
    )
  };

                  /************* ACCOUNT ADDRESS **************/

// ADD: Function to add 

export const addNewAddress = async (newAddress)=>{
return  axios.post(
    `http://localhost:8080/api/address`,
    newAddress,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    }
  );

}

// GET: Function to get current account detail 

export const getAccountAddress = async (token) => {
    return axios.get(
        "http://localhost:8080/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

                  /************* ACCOUNT ORDER **************/

// GET: Function to get current account detail

export const getAccountOrder = async (token) => {
    return axios.get("http://localhost:8080/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}

// GET: Function to get account's purchase history

export const getPurchaseHistories = async (userId) => {
    return axios.get(`http://localhost:8080/api/purchaseHistories/user/${userId}`);
}

// GET: Function to get account's purchase history

export const getOrder = async (userId) => {
    return axios.get(`http://localhost:8080/api/orders/userId/${userId}`);
}

// DELETE: Function to delete account's purchase history

export const deletePurchaseHistories = async (userId) =>{
    return axios.delete(`http://localhost:8080/api/purchaseHistories/user/${userId}`);
}

                  /************* ACCOUNT PRODUCT HISTORY **************/

// GET: Function to get account's purchase history

export const getAccountProductHistory = async (userId) => {
    return  axios.get(`http://localhost:8080/api/carts/cart/${userId}`);
}

// GET: Function to get product seen in Shop

export const getProductSeen = async (userId) => {
    return  axios.get(`http://localhost:8080/api/carts/cart/${userId}`);
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

                  /********** EMPLOYEE **********/
export const getCartById = async (id) => {
  return axios.get(`${API_BASE_URL}/carts/cart/${id}`);
}