module.exports = (req, res) => {
  if (req.method == "GET") {
    res.json([
      {
        name: "aymen",
        location: "algeria",
      },
      {
        name: "saleh",
        location: "egypt",
      },
      {
        name: "djamel",
        location: "tunisia",
      },
    ]);
  } else if (req.method == "POST") {
    res.status(200).json({
      message: "Success post request !!",
    });
  }
};
