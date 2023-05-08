const multer = require("multer");
const router = require("express").Router();
const { SMTPClient } = require("emailjs");
// "emailjs": "^3.8.0"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const myStorage = multer({ storage: storage });

router.post("/uploadfile", myStorage.single("myfile"), (req, res) => {
  res.status(200).json({ status: "success" });
});
const initMail = () => {
  return new SMTPClient({
    user: "***********@gmail.com",
    password: "*****************",
    host: "smtp.gmail.com",
    ssl: true,
  });
};
const client = initMail();
const sendMail = (to, subject, text) => {
  client.send(
    {
      text: text,
      from: "testproject2629@gmail.com",
      to: to,

      cc: "",
      subject: subject,
    },
    (err, message) => {
      console.log(err || message);
    }
  );
};

router.post("/sendmail", (req, res) => {
  const data = req.body;
  sendMail(data.to, data.subject, data.text);
  res.status(200).json({ message: "mail sent successfully" });
});

router.post("/", (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((data) => {
      console.log("Email Sent successfully..");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});
module.exports = router;
