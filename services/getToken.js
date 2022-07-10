import { JWT_COOKIE_EXPIRE } from "../config/appConfig";

export const getToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  };

  const userData = {
    email: user.email
  };
  // return { userData, token, options };

  return res.status(statusCode).cookie("token", token, options).json({
    statusCode,
    message,
    data: userData,
  });
};
