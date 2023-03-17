import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return '';
    }
  }
});

export function setNotification(notification, time) {
  return async dispatch => {
    const timeInMilliseconds = time * 1000;
    dispatch(addNotification(notification));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeInMilliseconds);
  };
}

export default notificationSlice.reducer;
export const { addNotification, resetNotification } = notificationSlice.actions;
