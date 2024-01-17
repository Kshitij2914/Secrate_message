const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/user')
const ChatModel = require('./models/chat')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/user")

//REGISTER
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err))
        })
        .catch(err => console.log(err.message))
})

//LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, responce) => {

                    if (responce) {
                        //token generation
                        const token = jwt.sign({ email: user.email }, "secret-key", { expiresIn: "1d" })
                        res.cookie("token", token)

                        const result = ["Success", user._id, user.name];
                        res.json(result)
                    }
                    else {
                        res.json("password is incorrect")
                    }
                })
            }
            else {
                res.json("No record exist ")
            }
        })
})


//home route after login for some time
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        return res.json("Token was not there")
    }
    else {
        jwt.verify(token, "secret-key", (err, decode) => {
            if (err) {
                return res.json("Token is wrong")
            }
            next()
        })
    }
}

app.get('/home', verifyUser, (req, res) => {
    return res.json("Success")
})

//logout
app.get('/logout', verifyUser, (req, res) => {
    try {
        res.clearCookie('token')
        return res.json("Success")
    }
    catch (error) {
        console.log(error)
    }
})

//forget password

app.post('/forget_password', (req, res) => {
    const { email } = req.body
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                const token = jwt.sign({ id: user._id }, "secret-key", { expiresIn: "1d" })
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'kshitijsharma479@gmail.com',
                        pass: 'iehj mnfd rsdq krud'
                    }
                });

                var mailOptions = {
                    from: 'kshitijsharma479@gmail.com',
                    to: email,
                    subject: 'Reset your password',
                    text: `http://localhost:5173/reset_password/${user._id}/${token}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Not")
                        console.log(error);
                    } else {
                        console.log("yes")
                        return res.json("Success")
                    }
                });
            }
            else {
                res.json("No record exist ")
            }

        })
        .catch(err => console.log(err.message))

})

//reset password
app.post('/reset_password/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, "secret-key", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error" })
        }
        else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(result => res.json("Success"))
                        .catch(err => res.json(err))
                })
                .catch(err => res.json(err))
        }
    })
})

//chat to database
app.post('/home', (req, res) => {
    const { name, id, message } = req.body;
    UserModel.findByIdAndUpdate({_id:id})
        .then(result => {
            if (result.chance) {
                ChatModel.create({ name, id, message })
                    .then(chat => {
                        UserModel.findByIdAndUpdate({ _id: id }, { chance: false })
                            .then(data => res.json(chat))
                            .catch(err => res.json(err))
                    })
                    .catch(err => res.json(err))
            }
            else {
                res.json("over")
            }
        })
        .catch(err => res.json(err))
})

app.get('/', (req, res) => {
    ChatModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("successfull connected")
})


