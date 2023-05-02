import React, { FC, useMemo } from 'react';

export interface State {
  pathname: string;
}

const initialState = {
  pathname: 'sld',
};

type Action = {
  type: 'SHOW_NAV_BAR';
};

export const AppContext = React.createContext<State | any>(initialState);

AppContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    /*case 'DARKEN_NAV_BAR': {
      return {
        ...state,
        darkNavBar: true,
      };
    } */
    default:
      return state;
  }
}

const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  // const showNavBar = () => dispatch({ type: 'SHOW_NAV_BAR' });

  const value = useMemo(
    () => ({
      ...state,
    }),
    [state],
  );

  return <AppContext.Provider value={{}} {...props} />;
};

export default AppProvider;

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as State;
};
