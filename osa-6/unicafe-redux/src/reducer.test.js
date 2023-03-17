import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = { good: 0, ok: 0, bad: 0 };

  test('should return a proper initial state when called with undefined state', () => {
    const action = { type: 'DO_NOTHING' };
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented with action GOOD', () => {
    const state = initialState;
    const action = { type: 'GOOD' };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 });
  });

  test('ok is incremented with action OK', () => {
    const state = initialState;
    const action = { type: 'OK' };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 1, bad: 0 });
  });

  test('bad is incremented with action BAD', () => {
    const state = initialState;
    const action = { type: 'BAD' };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 0, bad: 1 });
  });

  test('returns initial state with action RESET', () => {
    const state = initialState;
    let action = { type: 'GOOD' };

    deepFreeze(state);
    counterReducer(state, action);

    action = { type: 'RESET' };
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
