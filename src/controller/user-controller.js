import logger from "../config/logger.js";
import userService from "../services/user-service.js";
import generateToken from "../lib/token.js";

const user_controller = {
  createUser: async (req, res, next) => {
    try {
      const data = req.body;
      logger.info(`create user : requested data `);
      await userService.create(data);

      logger.info(`new user is created `);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      logger.error(`catch user_controller ${error}`);
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const user_data = req.body;
      const user_info = await userService.login(user_data);

      const access_token = generateToken.accessToken(user_info);
      const refresh_token = generateToken.refreshToken(user_info);

      await userService.saveRefreshToken(user_info, refresh_token);

      logger.info("user is logged in");
      res
        .cookie("refresh-token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 7 days
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .cookie("access-token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 7 days
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .status(200)
        .json({ success: true, message: "User logged-in successfully" });
    } catch (error) {
      next(error);
    }
  },
  userEmailVerification: async (req, res, next) => {
    try {
      const { email } = req.body;

      const is_user_verified = await userService.verifyEmail(email);
      logger.info("user is verified");

      res
        .cookie("verify-email", is_user_verified, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 1 days
          maxAge: 1000 * 60 * 60 * 24 * 1,
        })
        .status(200)
        .json({
          success: true,
          message: "your email is verified",
        });
    } catch (error) {
      next(error);
    }
  },

  userSendOtp: async (req, res, next) => {
    try {
      const { id, email, is_otp_expire } = req.user;

      console.log("user-controller userSendOtp", req.user);

      if (is_otp_expire === "false") {
        logger.warn("the otp is not expired yet.");
        return res.status(200).json({
          success: true,
          message: "An OTP has already been sent. Please check your email.",
        });
      }
      await userService.sendOtp(id, email);

      res
        .cookie("is-otp-expire", false, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 1 days
          maxAge: 1000 * 60 * 60 * 24 * 1,
        })
        .cookie("is-new-otp", true, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 1 days
          maxAge: 1000 * 60 * 60 * 24 * 1,
        })
        .status(200)
        .json({
          success: true,
          message: "OTP sent your email address",
          data: null,
        });
    } catch (error) {
      next(error);
    }
  },

  userVerifyOtp: async (req, res, next) => {
    try {
      const { email_otp } = req.body;
      const { id } = req.user;
      const otp_status = await userService.verifyEmailOtp(id, email_otp);

      // we change the cookie expiration (is-otp-expire) status , for re-sending the otp
      if (otp_status === "expired") {
        return res
          .cookie("is-otp-expire", true, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 7 days
            maxAge: 1000 * 60 * 60 * 24 * 7,
          })
          .status(200)
          .json({
            success: false,
            message: "Otp is expired",
            data: null,
          });
      }

      res
        .clearCookie("is-new-otp")
        .clearCookie("is-otp-expire")
        .clearCookie("verify-email")
        .cookie("otp-verified", true, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 7 days
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .send(200)
        .json({
          success: true,
          message: "Otp verified successfully",
          data: null,
        });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};

export default user_controller;
