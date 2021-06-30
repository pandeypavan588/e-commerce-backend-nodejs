const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        error: "Admin  already registered",
      });
    }
    if (error) {
      return res.status(400).json({
        error: "Something went wrong!!!!",
      });
    }
    let role = "admin";
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role
    });

    _user.save((error,user)=>{
        if (error) {
            console.log(error);
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if(user){
          return res.status(201).json({
              message:'Admin created Successfully..!'
          })
      }
    });
  });
};

exports.signin = (req,res)=>{
  User.findOne({email:req.body.email}).exec((error,user)=>{
if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword =  user.authenticate(req.body.password);
      if(isPassword && (user.role === "admin" || user.role === "super-admin")){
        const token = jwt.sign({_id:user._id,role: user.role},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        }); 
      }else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

    }else{
      return res.status(400).json({
          message: "Something went wrong",
        });
    }
  });

}



exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
