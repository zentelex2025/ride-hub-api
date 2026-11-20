import { body } from "express-validator";

const create_plan_validator = [
  body("vehicle_id")
    .trim()
    .notEmpty()
    .withMessage("Vehicle is required")
    .bail()
    .isMongoId()
    .withMessage("Vehicle ID must be a valid MongoDB ID"),

  body("hourly_rent_price")
    .notEmpty()
    .withMessage("Hourly rent is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Hourly rent cannot be negative")
    .bail()
    .toFloat(),

  body("weekly_rent_price")
    .notEmpty()
    .withMessage("Weekly rent is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Weekly rent cannot be negative")
    .bail()
    .toFloat(),

  body("monthly_rent_price")
    .notEmpty()
    .withMessage("Monthly rent is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Monthly rent cannot be negative")
    .bail()
    .toFloat(),

  body("daily_rent_price")
    .notEmpty()
    .withMessage("Daily rent is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Daily rent cannot be negative")
    .bail()
    .toFloat(),

  body("late_fee_fine_hourly")
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage("Late fee cannot be negative")
    .bail()
    .toFloat(),
];

export default create_plan_validator;