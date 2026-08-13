const LOST_ITEMS_KEY = "lostItems";
const FOUND_ITEMS_KEY = "foundItems";

// ===============================
// LOST ITEMS
// ===============================

export const getLostItems = () => {
  const items = localStorage.getItem(LOST_ITEMS_KEY);

  return items ? JSON.parse(items) : [];
};

export const saveLostItems = (items) => {
  localStorage.setItem(
    LOST_ITEMS_KEY,
    JSON.stringify(items)
  );
};

export const addLostItem = (item) => {
  const items = getLostItems();

  const newItem = {
    ...item,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "Lost",
  };

  saveLostItems([newItem, ...items]);

  return newItem;
};


// ===============================
// FOUND ITEMS
// ===============================

export const getFoundItems = () => {
  const items = localStorage.getItem(FOUND_ITEMS_KEY);

  return items ? JSON.parse(items) : [];
};

export const saveFoundItems = (items) => {
  localStorage.setItem(
    FOUND_ITEMS_KEY,
    JSON.stringify(items)
  );
};

export const addFoundItem = (item) => {
  const items = getFoundItems();

  const newItem = {
    ...item,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "Found",
  };

  saveFoundItems([newItem, ...items]);

  return newItem;
};


// ===============================
// DELETE
// ===============================

export const deleteLostItem = (id) => {
  const items = getLostItems();

  const updatedItems = items.filter(
    (item) => item.id !== id
  );

  saveLostItems(updatedItems);
};


export const deleteFoundItem = (id) => {
  const items = getFoundItems();

  const updatedItems = items.filter(
    (item) => item.id !== id
  );

  saveFoundItems(updatedItems);
};

export const recoverFoundItem = (id) => {
  const items = getFoundItems();

  const updatedItems = items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: "Recovered",
      };
    }

    return item;
  });

  saveFoundItems(updatedItems);
};

// ===============================
// CLEAR ALL DATA
// ===============================

export const clearAllData = () => {
  localStorage.removeItem(LOST_ITEMS_KEY);
  localStorage.removeItem(FOUND_ITEMS_KEY);
};

