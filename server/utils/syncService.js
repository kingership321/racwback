const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('./supabaseClient');
const { getFallbackData } = require('./fallbackStore');

const isUUID = (str) => {
  if (typeof str !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
};

let lastSyncTimestamp = null;
let isSyncing = false;

/**
 * Checks if Supabase is actually responsive and healthy
 */
const checkSupabaseHealth = async () => {
  if (!supabaseAdmin) return false;
  try {
    const { error } = await supabaseAdmin.from('settings').select('key', { count: 'exact', head: true });
    if (error && error.message && (error.message.includes('fetch failed') || error.message.includes('ENOTFOUND'))) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Pushes all local fallbackData.json entries up to Supabase database
 */
const syncAllToSupabase = async () => {
  if (isSyncing) {
    return { success: false, message: 'Sync already in progress' };
  }
  isSyncing = true;

  const results = {
    settings: 0,
    values: 0,
    themes: 0,
    stats: 0,
    board_members: 0,
    charter_messages: 0,
    previous_boards: 0,
    programs: 0,
    upcoming_programs: 0,
  };
  const errors = [];

  try {
    const isHealthy = await checkSupabaseHealth();
    if (!isHealthy) {
      isSyncing = false;
      return {
        success: false,
        message: 'Cannot sync: Supabase database is unreachable or offline. Local changes remain safely saved.',
        results,
        errors: ['Supabase connection test failed']
      };
    }

    // 1. Sync Settings
    try {
      const localSettings = getFallbackData('settings');
      for (const s of localSettings) {
        if (!s.key) continue;
        const { error } = await supabaseAdmin
          .from('settings')
          .upsert({ key: s.key, value: s.value }, { onConflict: 'key' });
        if (!error) results.settings++;
        else errors.push(`settings(${s.key}): ${error.message}`);
      }
    } catch (err) {
      errors.push(`settings: ${err.message}`);
    }

    // 2. Sync Values
    try {
      const localValues = getFallbackData('values');
      const { data: remoteValues } = await supabaseAdmin.from('values').select('*');
      for (const v of localValues) {
        const payload = {
          title: v.title,
          description: v.description,
          icon_name: v.icon_name || v.icon,
          display_order: v.display_order || 0
        };
        const existing = (remoteValues || []).find(r => 
          (isUUID(v.id) && r.id === v.id) || (r.title && r.title.toLowerCase() === (v.title || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('values').update(payload).eq('id', existing.id);
          if (!error) results.values++;
          else errors.push(`values(${v.title}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('values').insert([payload]);
          if (!error) results.values++;
          else errors.push(`values(${v.title}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`values: ${err.message}`);
    }

    // 3. Sync Themes
    try {
      const localThemes = getFallbackData('themes');
      const { data: remoteThemes } = await supabaseAdmin.from('themes').select('*');
      for (const t of localThemes) {
        const payload = {
          title: t.title,
          description: t.description,
          image_url: t.image_url || t.logo_url || '',
          display_order: t.display_order || 0
        };
        const existing = (remoteThemes || []).find(r => 
          (isUUID(t.id) && r.id === t.id) || (r.title && r.title.toLowerCase() === (t.title || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('themes').update(payload).eq('id', existing.id);
          if (!error) results.themes++;
          else errors.push(`themes(${t.title}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('themes').insert([payload]);
          if (!error) results.themes++;
          else errors.push(`themes(${t.title}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`themes: ${err.message}`);
    }

    // 4. Sync Stats
    try {
      const localStats = getFallbackData('stats');
      const { data: remoteStats } = await supabaseAdmin.from('stats').select('*');
      for (const st of localStats) {
        const payload = {
          title: st.title || st.label,
          target: st.target !== undefined ? st.target : (st.value || 0),
          suffix: st.suffix || '',
          display_order: st.display_order || 0
        };
        const existing = (remoteStats || []).find(r => 
          (isUUID(st.id) && r.id === st.id) || (r.title && r.title.toLowerCase() === (payload.title || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('stats').update(payload).eq('id', existing.id);
          if (!error) results.stats++;
          else errors.push(`stats(${payload.title}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('stats').insert([payload]);
          if (!error) results.stats++;
          else errors.push(`stats(${payload.title}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`stats: ${err.message}`);
    }

    // 5. Sync Board Members
    try {
      const localBoard = getFallbackData('board_members');
      const { data: remoteBoard } = await supabaseAdmin.from('board_members').select('*');
      for (const m of localBoard) {
        const payload = {
          name: m.name,
          position: m.position,
          role: m.role || 'member',
          committee: m.committee || null,
          contribution: m.contribution || null,
          year: m.year || new Date().getFullYear(),
          image_url: m.image_url || '',
          facebook_url: m.facebook_url || null,
          linkedin_url: m.linkedin_url || null,
          email: m.email || null,
          display_order: m.display_order || 0
        };
        const existing = (remoteBoard || []).find(r => 
          (isUUID(m.id) && r.id === m.id) || (r.name && r.name.toLowerCase() === (m.name || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('board_members').update(payload).eq('id', existing.id);
          if (!error) results.board_members++;
          else errors.push(`board_members(${m.name}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('board_members').insert([payload]);
          if (!error) results.board_members++;
          else errors.push(`board_members(${m.name}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`board_members: ${err.message}`);
    }

    // 6. Sync Charter Messages
    try {
      const localCharter = getFallbackData('charter_messages');
      const { data: remoteCharter } = await supabaseAdmin.from('charter_messages').select('*');
      for (const c of localCharter) {
        const payload = {
          name: c.name,
          position: c.position,
          organization: c.organization || '',
          term: c.term || '',
          image_url: c.image_url || '',
          message: Array.isArray(c.message) ? c.message.join('\n\n') : (c.message || '')
        };
        const existing = (remoteCharter || []).find(r => 
          (isUUID(c.id) && r.id === c.id) || (r.name && r.name.toLowerCase() === (c.name || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('charter_messages').update(payload).eq('id', existing.id);
          if (!error) results.charter_messages++;
          else errors.push(`charter_messages(${c.name}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('charter_messages').insert([payload]);
          if (!error) results.charter_messages++;
          else errors.push(`charter_messages(${c.name}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`charter_messages: ${err.message}`);
    }

    // 7. Sync Previous Boards
    try {
      const localPB = getFallbackData('previous_boards');
      const { data: remotePB } = await supabaseAdmin.from('previous_boards').select('*');
      for (const pb of localPB) {
        const payload = {
          year_label: pb.year_label || pb.year,
          image_url: pb.image_url || '',
          display_order: pb.display_order || 0
        };
        const existing = (remotePB || []).find(r => 
          (isUUID(pb.id) && r.id === pb.id) || (r.year_label === payload.year_label)
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('previous_boards').update(payload).eq('id', existing.id);
          if (!error) results.previous_boards++;
          else errors.push(`previous_boards(${payload.year_label}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('previous_boards').insert([payload]);
          if (!error) results.previous_boards++;
          else errors.push(`previous_boards(${payload.year_label}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`previous_boards: ${err.message}`);
    }

    // 8. Sync Programs
    try {
      const localPrograms = getFallbackData('programs');
      const { data: remotePrograms } = await supabaseAdmin.from('programs').select('*');
      for (const p of localPrograms) {
        const payload = {
          title: p.title,
          date: p.date,
          place: p.place || p.venue || '',
          coorganizer: p.coorganizer || '',
          display_order: p.display_order || 0
        };
        const existing = (remotePrograms || []).find(r => 
          (isUUID(p.id) && r.id === p.id) || (r.title && r.title.toLowerCase() === (p.title || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('programs').update(payload).eq('id', existing.id);
          if (!error) results.programs++;
          else errors.push(`programs(${p.title}): ${error.message}`);
        } else {
          const { data: inserted, error } = await supabaseAdmin.from('programs').insert([payload]).select();
          if (!error && inserted && inserted.length > 0) {
            results.programs++;
            // If program had images, insert into program_images
            const images = p.program_images || p.images || [];
            if (images.length > 0) {
              const imgInserts = images.map((img, idx) => ({
                program_id: inserted[0].id,
                image_url: typeof img === 'string' ? img : (img.image_url || ''),
                display_order: idx
              })).filter(img => img.image_url);
              if (imgInserts.length > 0) {
                await supabaseAdmin.from('program_images').insert(imgInserts);
              }
            }
          } else if (error) {
            errors.push(`programs(${p.title}): ${error.message}`);
          }
        }
      }
    } catch (err) {
      errors.push(`programs: ${err.message}`);
    }

    // 9. Sync Upcoming Programs
    try {
      const localUpcoming = getFallbackData('upcoming_programs');
      const { data: remoteUpcoming } = await supabaseAdmin.from('upcoming_programs').select('*');
      for (const up of localUpcoming) {
        const payload = {
          title: up.title,
          description: up.description || '',
          display_order: up.display_order || 0
        };
        const existing = (remoteUpcoming || []).find(r => 
          (isUUID(up.id) && r.id === up.id) || (r.title && r.title.toLowerCase() === (up.title || '').toLowerCase())
        );
        if (existing) {
          const { error } = await supabaseAdmin.from('upcoming_programs').update(payload).eq('id', existing.id);
          if (!error) results.upcoming_programs++;
          else errors.push(`upcoming_programs(${up.title}): ${error.message}`);
        } else {
          const { error } = await supabaseAdmin.from('upcoming_programs').insert([payload]);
          if (!error) results.upcoming_programs++;
          else errors.push(`upcoming_programs(${up.title}): ${error.message}`);
        }
      }
    } catch (err) {
      errors.push(`upcoming_programs: ${err.message}`);
    }

    lastSyncTimestamp = new Date().toISOString();
    return {
      success: true,
      message: 'Local fallback data successfully synchronized to Supabase database',
      results,
      errors: errors.length > 0 ? errors : null,
      lastSync: lastSyncTimestamp
    };
  } finally {
    isSyncing = false;
  }
};

const getSyncStatus = async () => {
  const isHealthy = await checkSupabaseHealth();
  return {
    isSupabaseOnline: isHealthy,
    isSyncing,
    lastSync: lastSyncTimestamp,
    mode: isHealthy ? 'online' : 'local_fallback'
  };
};

module.exports = {
  checkSupabaseHealth,
  syncAllToSupabase,
  getSyncStatus
};
