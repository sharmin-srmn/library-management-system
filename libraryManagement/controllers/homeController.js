const homeController = (req, res) =>{
    res.render('index', {title : 'Home - Library Management'})
}

export {homeController}