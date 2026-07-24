const { supabaseAdmin } = require('../utils/supabaseClient');

const adminMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data || data.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

module.exports = adminMiddleware;