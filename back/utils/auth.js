const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    console.log(decode);

    if (err) {
      console.log(err);
      res.json({ status: 401, err: err });
    } else {
      req.id = decode.id;
      req.email = decode.email;
      next();
    }
  });
};

module.exports = auth;

// Fonction verify de jwt pour check le token
//   const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

//   // On récupére l'id de l'utilisateur dans le token
//   const userId = decodedToken.userID;

//   // Si la requéte contient un userID, on le compare avec celui extrait du token, si !== on génére une erreur
//   if (req.body.userId && req.body.userId !== userId) {
//     throw "Invalid User ID";
//   } else {
//     next();
//   }
// } catch {
//   res.status(401).json({
//     error: new Error("Invalid Request !"),
//   });
// }
