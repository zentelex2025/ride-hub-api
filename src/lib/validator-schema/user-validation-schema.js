import { body } from "express-validator";

const user_validator = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Full name cannot exceed 50 characters"),

  body("number")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isNumeric()
    .withMessage("Phone number must contain only digits")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Phone number cannot exceed 15 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Email cannot exceed 50 characters")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),

  body("profile_image")
    .optional({ nullable: true })
    .isString()
    .withMessage("Profile image must be a string"),

  body("address")
    .isArray({ min: 1 })
    .withMessage("At least one address is required"),

  body("address.*.full_address")
    .trim()
    .notEmpty()
    .withMessage("Full address is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Full address cannot exceed 100 characters"),

  body("address.*.city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .bail()
    .isLength({ max: 30 })
    .withMessage("City cannot exceed 30 characters"),

  body("address.*.state")
    .trim()
    .notEmpty()
    .withMessage("State is required")
    .bail()
    .isLength({ max: 25 })
    .withMessage("State cannot exceed 25 characters"),

  body("user_type")
    .isIn(["B2B", "B2C"])
    .withMessage("User type must be B2B or B2C"),

  body("organization_name")
    .if(body("user_type").equals("B2B"))
    .trim()
    .notEmpty()
    .withMessage("Organization name is required for B2B users")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Organization name cannot exceed 50 characters"),

  body("working_for")
    .if(body("user_type").equals("B2C"))
    .trim()
    .notEmpty()
    .withMessage("Working for is required for B2C users")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Working for cannot exceed 50 characters"),
];

export default user_validator;
