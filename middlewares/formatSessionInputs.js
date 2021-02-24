const formatSessionInputs = (req, res, next) => {
  console.log('hit')
  for (const value in req.body) {
    if (value === "game") {
      const gameReg = /hi(gh)?(\W|_)lo(w)?/i;
      if (gameReg.test(req.body.game)) {
        req.body.game = req.body.game.replace(gameReg, "Hi_Lo");
      }
    }
    if (value === "stake") {
      const stakeReg = /^\d{1,2}(\.\d{2})?\/\d{1,2}(\.\d{2})?$/;
      if (stakeReg.test(req.body.stake)) {
        req.body.stake = req.body.stake.replace("/", "_");
      }
    }
    if (value === "time_length") {
      const formattedLength = req.body.time_length.split(":").map(el => parseInt(el));
      formattedLength[1] = Math.round(formattedLength[1] * 5 / 3);
      if(formattedLength[1] < 10){
        formattedLength[1] = `0${formattedLength[1]}`;
      }
      req.body.time_length = parseFloat(formattedLength.join("."));
    }
    if (value === "buyin" || value === "cashout") {
      req.body[value] = parseFloat(req.body[value]);
    }
  }
  req.body.profit = req.body.cashout - req.body.buyin;
  next();
}

module.exports = formatSessionInputs;