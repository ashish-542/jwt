const User = require('../model/user');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    try {
        let {username,password}=req.body;
        if(!username ||!password){
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if(await User.findOne({username})){
            return res.status(400).json({ error: 'Username already exists' });    
        }
        const user = new User(req.body);
        await user.save();  
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {    
        res.status(500).json({ error: error.message });
    }
}

const getUsers = async (req, res) => {    
    try {
        const user = await User.find();
        res.json(user);
    }catch(error){
        res.status(500).json({ error: error.message });
    }    
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password!= password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ username: user._id }, "JWT_SECRET", { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={
    addUser,
    getUsers,
    login
};