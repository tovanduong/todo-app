import React from "react";
import { AppStateProvider } from './component/provider';
import { AppStateConsumer } from './component/todolist';

const App = () => {
  return (
    <AppStateProvider>
      <AppStateConsumer />
    </AppStateProvider>
  );
};

export default App;
