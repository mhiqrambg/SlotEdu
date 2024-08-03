const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "⭐"];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

exports.spin = async (req, res) => {
  const name = req.cookies.name;
  let saldoAwal = parseInt(req.cookies.topUp) || 0;
  let winCount = parseInt(req.cookies.winCount) || 0;
  let loseCount = parseInt(req.cookies.loseCount) || 0;

  const totalSpins = winCount + loseCount;
  console.log(totalSpins);

  if (saldoAwal <= 5000) {
    return res.redirect("/");
  }

  let symbol1, symbol2, symbol3;

  if (totalSpins === 7 || totalSpins === 13 || totalSpins === 27) {
    symbol1 = symbol2 = symbol3 = getRandomSymbol();
  } else {
    do {
      symbol1 = getRandomSymbol();
      symbol2 = getRandomSymbol();
      symbol3 = getRandomSymbol();
    } while (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3);
  }

  const isWinner = symbol1 === symbol2 && symbol2 === symbol3;
  const isLose =
    symbol1 !== symbol2 && symbol2 !== symbol3 && symbol1 !== symbol3;
  const isCenter =
    symbol1 === symbol2 || symbol2 === symbol3 || symbol3 === symbol1;

  if (isWinner) {
    saldoAwal += 10000;
    winCount++;
  } else if (isLose) {
    saldoAwal -= 5000;
    loseCount++;
  } else if (isCenter) {
    saldoAwal += 1200;
  }

  // Simpan saldo terbaru dan statistik dalam cookie
  await res.cookie("topUp", saldoAwal, {
    expires: new Date(Date.now() + 900000), // 15 menit
    httpOnly: true,
  });
  await res.cookie("winCount", winCount, {
    expires: new Date(Date.now() + 900000), // 15 menit
    httpOnly: true,
  });
  await res.cookie("loseCount", loseCount, {
    expires: new Date(Date.now() + 900000), // 15 menit
    httpOnly: true,
  });

  // Hitung rasio kemenangan

  const resultMessage = isWinner
    ? "Anda Menang! +10.000"
    : isLose
    ? "Maaf, Anda Kalah! -5.000"
    : "Anda Menang! +1.200";

  // Render the view with data
  res.render("game", {
    name,
    symbol1,
    symbol2,
    symbol3,
    resultMessage,
    saldoAwal,
    totalSpins, // Format rasio kemenangan
  });
};
