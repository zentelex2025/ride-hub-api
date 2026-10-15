import jwt from "jsonwebtoken";

const generateToken = {
  accessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
  },
  refreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      },
    );
  },
};

export default generateToken;
