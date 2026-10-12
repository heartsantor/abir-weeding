import React from 'react';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import InvitationPage from './pages/InvitationPage';

function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <InvitationPage />
      </LanguageProvider>
    </DataProvider>
  );
}

export default App;
