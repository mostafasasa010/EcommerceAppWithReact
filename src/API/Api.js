import Cookie from "cookie-universal";

const cookie = Cookie();

// Base API
export const BaseApi = `https://e-commerce-l194.onrender.com/api/v1/`;

// Authantication API
export const USER = `user/`;
export const SIGNUP = `signUp/`;
export const LOGIN = `logIn/`;

// Dashboard API
export const USERID = `${cookie.get("cookieId")}/`;
export const PRODUCTS = `product/`;
export const CATEGORY = `category/`;

// Images API
export const IMAGES = `https://e-commerce-l194.onrender.com/images/`;
