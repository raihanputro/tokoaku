import { SET_MESSAGES } from '@containers/Language/constants';

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages,
});
