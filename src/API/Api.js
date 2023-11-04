import Cookie from "cookie-universal";

const cookie = Cookie();

export const BaseApi = `https://e-commerce-l194.onrender.com/api/v1/`;
export const USER = `user/`;
export const SIGNUP = `signUp/`;
export const LOGIN = `logIn/`;
export const USERID = `${cookie.get("cookieId")}/`;
export const PRODUCTS = `product/`;
export const CATEGORY = `category/`;
