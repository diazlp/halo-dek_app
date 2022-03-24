module.exports = (req, res, next) => {
  if (req.session.user.credits < 1) {
    const msg = `Add your credit to post a question`;
    return res.redirect(`/payment/checkout?message=${msg}`);
  }

  next();
};
