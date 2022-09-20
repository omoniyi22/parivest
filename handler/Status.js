const Status = {
  type: {
    SUCCESS: "success",
    FAILURE: "failure",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not Found",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  CREATED: {
    code: 201,
    message: "Created Successfully",
  },
  OK: {
    code: 200,
    message: "Successfully",
  },
  SERVER_ERROR: {
    code: 500,
    message: "Error",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },

  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  SERVICE_UNAVAILABLE: 503,
};

//  res.status(Status.BAD_REQUEST.code).json({
//         message: Status.BAD_REQUEST.message,
//         reason: error.details[0].message,
//       });
//     else {
//       verifySigup(req, res);
//     }
//   } catch (error) {
//     res.status(Status.SERVER_ERROR.code).send({
//       message: Status.SERVER_ERROR.message,
//       error: error,
//     });

module.exports = Status;
