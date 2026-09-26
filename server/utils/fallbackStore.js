const fs = require('fs');
const path = require('path');

const fallbackDataPath = path.resolve(__dirname, '..', 'data', 'fallbackData.json');

let inMemoryData = null;

const loadData = () => {
  if (inMemoryData) return inMemoryData;
  try {
    const raw = fs.readFileSync(fallbackDataPath, 'utf8');
    inMemoryData = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load fallbackData.json:', err.message);
    inMemoryData = {
      charter_messages: [],
      board_members: [],
      themes: [],
      values: [],
      stats: [],
      previous_boards: [],
      programs: [],
      upcoming_programs: [],
      settings: []
    };
  }
  return inMemoryData;
};

const getFallbackData = (key) => {
  const data = loadData();
  return data[key] ? JSON.parse(JSON.stringify(data[key])) : [];
};

const getSetting = (key) => {
  const settings = getFallbackData('settings');
  const found = settings.find(s => s.key === key);
  if (found) {
    return found;
  }
  return null;
};

const saveStore = () => {
  try {
    fs.writeFileSync(fallbackDataPath, JSON.stringify(inMemoryData, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save to fallbackData.json:', err.message);
  }
};

const addItem = (key, item) => {
  const data = loadData();
  if (!data[key]) data[key] = [];
  const newItem = { id: item.id || Date.now().toString(), ...item };
  data[key].push(newItem);
  saveStore();
  return newItem;
};

const updateItem = (key, id, updates) => {
  const data = loadData();
  if (!data[key]) return null;
  const idx = data[key].findIndex(i => String(i.id) === String(id) || String(i.key) === String(id));
  if (idx === -1) return null;
  data[key][idx] = { ...data[key][idx], ...updates };
  saveStore();
  return data[key][idx];
};

const deleteItem = (key, id) => {
  const data = loadData();
  if (!data[key]) return false;
  const initialLen = data[key].length;
  data[key] = data[key].filter(i => String(i.id) !== String(id) && String(i.key) !== String(id));
  if (data[key].length !== initialLen) {
    saveStore();
    return true;
  }
  return false;
};

module.exports = {
  getFallbackData,
  getSetting,
  addItem,
  updateItem,
  deleteItem
};
