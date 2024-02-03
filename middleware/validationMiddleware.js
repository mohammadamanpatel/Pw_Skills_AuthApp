const validateSignupData = (req, res, next) => {
    const { name, username, bio, email, password } = req.body;
  
    if (!name || !username || !bio || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    next();
  };
  
  const validateLoginData = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    next();
  };
  
  module.exports = {
    validateSignupData,
    validateLoginData,
  };
  