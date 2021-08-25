const responser = {
  template: (code, textCode, message, data) => {
    return {
      status: {
        code,
        textCode,
        message
      },
      data
    };
  },
  // 200
  ok_200: (res, message, data) =>
    res.status(200).json(responser.template(200, "OK", message, data)),

  created_201: (res, message) =>
    res.status(201).json(responser.template(201, "Created", message)),

  // 400
  badRequest_400: (res, message) =>
    res.status(400).json(responser.template(400, "Bad Request", message)),

  unauthorized_401: (res, message) =>
    res.status(401).json(responser.template(401, "Unauthorized", message)),

  forbidden_403: (res, message) =>
    res.status(403).json(responser.template(403, "Forbidden", message)),

  notFound_404: (res, message) =>
    res.status(404).json(responser.template(404, "Not Found", message)),

  methodNotAllowed_405: (res, message) =>
    res
      .status(405)
      .json(responser.template(405, "Method Not Allowed", message)),

  notAccepted_406: (res, message) =>
    res.status(406).json(responser.template(406, "Not Acceptable", message)),

  // 500
  internalServerError_500: (res, message, data) =>
    res
      .status(500)
      .json(responser.template(500, "Internal Server Error", message, data))
};
module.exports = responser;
