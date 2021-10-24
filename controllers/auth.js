import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import jwt from 'jsonwebtoken'

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ err: 'bad credentials'})
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user)
        res.json({ token })
      } else {
        return res.status(401).json({ err: 'bad credentials'})
      }
    })
  } catch(err) {
    return res.status(400).json(err)
  }
}

const signup = async (req, res) => {
  const user = new User(req.body); 
  const newProfile = new Profile(req.body)

  user.profile = newProfile._id
  
  try {
    await user.save();
    await newProfile.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    let errMsg;
    if (error.errors?.email) {
      errMsg = "This email already exists";
    } else if (error.errors?.handle) {
      errMsg = "This Username already exists";
    } else {
      errMsg = "Something went wrong!";
    }
    res.status(400).send({ err: errMsg });
  }
};

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}

export {
  signup,
  login,
}