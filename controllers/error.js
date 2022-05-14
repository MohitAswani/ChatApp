exports.getError = (req, res, next) => {
    res.status(404).render('error.ejs', {
        pageTitle: 'Page Not found'
    });
}