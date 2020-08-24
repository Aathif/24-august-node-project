module.exports = {
    ensureAuth : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        console.log('please login to view');
        res.redirect('/users/login');

    }
}