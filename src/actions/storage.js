/**
 * Action creators
 */
const storeItem = item => ({ type: 'STORE_ITEM', payload: item });
const removeItem = () => ({ type: 'REMOVE_ITEM' });
const setNewKey = key => ({ type: 'SET_KEY', payload: key });

export { storeItem, removeItem, setNewKey };
