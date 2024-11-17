const homeController = (req, res) => {
  res.render("index", {
    title: "Home - Library Management",
    isBook: false,
    isStudent: false,
  });
};

export { homeController };
