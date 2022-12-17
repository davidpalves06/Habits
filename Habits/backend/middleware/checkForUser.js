const checkUser = (req,res,next) => {
   const user = req.user
   if (user.id != req.params.id) {
    res.status(420).json({error:"Este user não tem permissão para aceder a este endpoint!"})
    return 
   }

    return next()
}

module.exports = checkUser