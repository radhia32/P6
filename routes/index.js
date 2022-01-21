const sauceRoutes =require('./sauce');

 (app) => {
  app.use('/api/sauces', sauceRoutes);
};
module.exports = router;
