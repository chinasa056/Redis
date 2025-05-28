const Joi = require("joi");

const weatherQuerySchema = Joi.object({
  city: Joi.string().trim().min(2).pattern(/^[a-zA-Z\s]+$/).required().messages({
      "string.base": "City must be a string.",
      "string.empty": "City cannot be empty.",
      "string.min": "City must be at least 2 characters long.",
      "string.pattern.base": "City can only contain letters and spaces.",
      "any.required": "City is required.",
    }),
});

const validateWeatherQuery = (req, res, next) => {
  const { error } = weatherQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  next();
};

module.exports = validateWeatherQuery;
