const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("fullName", "name field is required!").notEmpty(),
  check("email", "email field should be a valid email").isEmail(),
  check("password", "password should be at least 6 characters").isLength({
    min: 6,
  }),
];

exports.valid = (req, res, next) => {
  const errors = validationResult(req);

  errors.isEmpty()
    ? next()
    : res.status(400).json({ errors: errors.array().map((el) => el.msg) });
};
