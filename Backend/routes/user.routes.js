const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { loginvalidator } = require("../middlewares/login.validator");
const registrationValidator = require("../middlewares/registration.validator");
require("dotenv").config();
const saltRounds = +process.env.saltRounds;
const connection = mysql.createConnection(process.env.MySQLURL);
const { ScheduleSystem } = require("../app");
const { authenticate } = require("../middlewares/authenticator");
const passport = require("../configs/gooleAuth");

const userRouter = express.Router();
const system = new ScheduleSystem();

var transporter = nodemailer.createTransport({
  service:"gmail",
  host:"smtp.gmail.com",
  secure:false,
  auth:{
    user:process.env.from_email,
    pass:process.env.email_password
  }
});

userRouter.get("/", (req, res) => {
  res.status(200).send({ msg: `Basic API endpoint` });
});

userRouter.post("/register", registrationValidator, async (req, res) => {
  const data = req.body;
  if (data.role !== "admin") {
    data.role = "user";
  }
  if (new Date(data.date_of_birth) == "Invalid date") {
    return res
      .status(422)
      .send({
        msg: `Please provide date_of_birth in correct format (YYYY-MM-DD)`,
      });
  }
  const password = await bcrypt.hash(data.password, saltRounds);
  connection.query(
    `select * from users where email = '${data.email}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            msg: `Something went wrong, please try again`,
            err: err.message,
          });
      } else if (rows.length) {
        return res.status(409).send({ msg: `Email is already registered` });
      } else {
        const user = system.initializeUser(
          data.name,
          data.date_of_birth,
          data.email,
          data.phone,
          password
        );
        connection.query(
          `insert into users (name, date_of_birth, phone, email, password, role) values ('${data.name}', '${data.date_of_birth}', '${data.phone}', '${data.email}', '${password}', '${data.role}')`,
          (err, rows, fields) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({
                  msg: `Something went wrong, please try again`,
                  err: err.message,
                });
            }
            else {
              const mail = {
                from:process.env.from_email,
                to: req.body.email,
                subject:"Welcome message",
                text:"welcome to app"
              }
              console.log(mail);
              transporter.sendMail(mail,(err,response)=>{
                if(err){
                  console.log(err);
                }
                else{
                  console.log(response);
                }
                return res
                .status(201)
                .send({
                  msg: `Registration successful as ${data.role}`,
                  role: data.role,
                  rows,
                });
              })

            }
          }
        );
      }
    }
  );
});

userRouter.post("/login", loginvalidator, (req, res) => {
  const data = req.body;
  connection.query(
    `select * from users where email = '${data.email}'`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            msg: `Something went wrong, please try again`,
            err: err.message,
          });
      } else if (!rows.length) {
        return res.status(401).send({ msg: `Account does not exists` });
      }
      bcrypt.compare(data.password, rows[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({
              msg: `Something went wrong, please try again`,
              err: err.message,
            });
        } else if (!result) {
          return res.status(401).send({ msg: `Password do not match` });
        }
        const token = jwt.sign(rows[0], process.env.key);
        res
          .status(200)
          .send({
            msg: `Login Successful as ${rows[0].role}`,
            role: rows[0].role,
            token,
          });
      });
    }
  );
});

userRouter.get("/auth/github", async (req, res) => {
  const { code } = req.query;

  console.log(code);

  const getToken = async () => {
    try {
      let token = await fetch(" https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: code,
        }),
      });

      token = await token.json();

      console.log(token);

      getUserinfo(token);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ msg: `Something went wrong`, error: error.message });
    }
  };

  const getUserinfo = async (token) => {
    try {
      let userInfo = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      userInfo = await userInfo.json();

      console.log(userInfo);
      res.cookie("token", token, "username", userInfo.name);
      if (token.access_token) {
        // res.status(200).send({msg: `Login Successful`, token, userInfo});
        connection.query(
          `select * from users where email = '${userInfo.email}'`,
          async (err, rows) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({
                  msg: `Something went wrong, please try again`,
                  err: err.message,
                });
            }
            if (!rows.length) {
              connection.query(
                `insert into users (name, date_of_birth, phone, email, password, role, Github) values ('${userInfo.name}', 'null', 'null', '${userInfo.email}', 'null', 'user', '${userInfo.login}')`,
                () => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .send({
                        msg: `Something went wrong, please try again`,
                        err: err.message,
                      });
                  }
                  const payload = {
                    id: rows.insertId,
                    name: userInfo.name,
                    email: userInfo.email,
                    role: "user",
                    Github: userInfo.login,
                  };
                  const token = jwt.sign(payload, process.env.key);
                  return res
                    .status(200)
                    .send({
                      msg: "Login SUccessful as user",
                      token,
                      Github: userInfo.login,
                    });
                }
              );
            } else {
              const token = jwt.sign(rows[0], process.env.key);
              return res
                .status(200)
                .send({ msg: "Login Successful as user", token });
            }
          }
        );
      } else {
        res.status(500).send({ msg: `Login Failed`, token, userInfo });
      }
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .send({ msg: `Something went wrong`, error: error.message });
    }
  };

  getToken();

});

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", `email`] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/loginfaliure",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    //   res.json({"user":req.user})
    res.status(200).send(req.user);
  }
);

userRouter.get("/loginfaliure",(req, res) => {
    res.send('login faliure');
})

userRouter.get("/slots", (req, res) => {
  connection.query(
    "select * from slots where isbooked = 0",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            msg: `Something went wrong, please try again`,
            err: err.message,
          });
      }
      res.status(200).send(rows);
    }
  );
});

userRouter.get("/doctors", (req, res) => {
  connection.query("select * from doctors", (err, rows, fields) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({
          msg: `Something went wrong, please try again`,
          err: err.message,
        });
    }
    res.status(200).send(rows);
  });
});

userRouter.use(authenticate("user"));

userRouter.post("/newMeeting", (req, res) => {
  const data = req.body;
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.key);

  if (!data.sub_category || !data.category || !data.slotId || !data.doctorId) {
    return res
      .status(401)
      .send({
        msg: `Please provide category, sub_category, slotId and doctorId`,
      });
  }

  connection.query(
    `select * from slots where id = ${data.slotId} and isbooked = 0`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ msg: `Something went wrong`, err: err.message });
      } else if (!rows.length) {
        return res.status(404).send({ msg: `slot Not available` });
      } else if (
        rows[0].category !== data.category ||
        rows[0].sub_category !== data.sub_category
      ) {
        return res
          .status(409)
          .send({
            msg: `This slot is not available for provided category or sub_category`,
          });
      }

      const slot = rows[0];

      connection.query(
        `insert into meetings (userId, slotId, doctorId, category, sub_category) values ('${user.id}', ${slot.id}, '${data.doctorId}', '${data.category}', '${data.sub_category}')`,
        (err, rows) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ msg: `Something went wrong`, err: err.message });
          }

          system.innitializeMeeting(data.category, data.sub_category, +user.id);

          connection.query(
            `update slots set isbooked = 1, meetingId = ${rows.insertId} where id = ${slot.id}`,
            (err, rows) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .send({ msg: `Something went wrong`, err: err.message });
              }

              res.status(200).send({ msg: `Meeting Initialised`, rows });
            }
          );
        }
      );
    }
  );
});

userRouter.get("/getCost/:slotId", (req, res) => {
  const slotId = req.params.slotId;

  if (!slotId) {
    return res.status(401).send({ msg: "Please provide slotId as parameter" });
  }

  connection.query(`select * from slots where id = ${slotId}`, (err, rows) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({
          msg: `Something went wrong, please try again`,
          err: err.message,
        });
    } else if (!rows.length) {
      return res.status(404).send({ msg: `Slot not available` });
    }

    const cost = system.calculatecost(rows[0]);
    return res.status(200).send({ cost });
  });
});

userRouter.post("/pay", (req, res) => {
  const data = req.body;
  if (!data.userId || !data.slotId || !data.amount || !data.method) {
    return res
      .status(401)
      .send({ msg: `Please provide userId, slotId, amount and method` });
  }
  if (
    data.method !== "cash" &&
    data.method !== "card" &&
    data.method !== "netbanking" &&
    data.method !== "upi"
  ) {
    return res
      .status(401)
      .send({
        msg: "Please select method from cash, card, upi and netbanking",
      });
  }
  connection.query(
    `insert into payments (userId, slotId, method, amount) values ('${data.userId}', '${data.slotId}', '${data.method}', '${data.amount}')`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({
            msg: `Something went wrong, please try again`,
            err: err.message,
          });
      }
      const mail = {
        from:process.env.from_email,
        to: req.body.email,
        subject:"Slot Confirmation Mail",
        text:` Your slot has hasbeen booked with userid ${data.userId} Payment Successfull  `
      }
      console.log(mail);
      transporter.sendMail(mail,(err,response)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(response);
        }
        res
        .status(200)
          .send({ msg: "Transaction saved to DB successfully", rows });
      })
    }
  );
});
/////stripe 


userRouter.post("/payment", async (req, res) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
          {
              price_data: {
                  currency: "inr",
                  product_data: {
                      Cat: product.cat
                  },
                  unit_amount: product.amount ,
              }
          },
      ],
      mode: "payment",
      success_url: " https://uninterested-weather-2204-frontend.vercel.app/",
      cancel_url: ` https://uninterested-weather-2204-frontend.vercel.app/cancel.html`,
      // success_url: `${YOUR_DOMAIN}/success.html`,
      // cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});




module.exports = { userRouter, connection };
