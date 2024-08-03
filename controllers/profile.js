const saveProfile = async (req, res) => {
  const { name, topUp } = req.body;
  await res.cookie("name", name, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  });
  await res.cookie("topUp", topUp, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  });

  res.redirect("/game");
};

module.exports = { saveProfile };
