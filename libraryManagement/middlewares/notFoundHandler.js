import createError from "http-errors";
export const notFoundHandler = (req, res, next) => {
  next(createError(404, "Requested Url nOt fOund."));
};

export const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === " development" ? err : { message: err.message };
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.render("error", {
    title: "Not Found",
    isBook: false,
    isStudent: false,
    status: statusCode,
  });
  //   if (isHtml) {
  //     res.render("error", {
  //       title: "Not Found",
  //       isBook: false,
  //       isStudent: false,
  //     });
  //   } else {
  //     res,
  //       json({
  //         message: res.locals.error,
  //       });
  //   }
};
