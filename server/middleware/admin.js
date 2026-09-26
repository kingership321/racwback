const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');

const adminMiddleware = async (req, res, next) => {
  const localAdminEmail = (process.env.ADMIN_EMAIL || 'kingership321@gmail.com').toLowerCase().trim();
  if (req.user && (
    req.user.role === 'admin' || 
    req.user.id === 'local-admin-id' || 
    (req.user.email && req.user.email.toLowerCase().trim() === localAdminEmail)
  )) {
    return next();
  }

  const userId = req.user?.id;
  if (!userId) return res.status(403).json({ error: 'Admin access required' });

  if (canQuerySupabase() && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        markSupabaseDown(error);
      } else if (data && data.role === 'admin') {
        req.user.role = 'admin';
        return next();
      }
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  return res.status(403).json({ error: 'Admin access required' });
};

module.exports = adminMiddleware;