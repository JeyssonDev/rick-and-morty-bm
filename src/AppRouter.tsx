import { Route, Routes } from 'react-router-dom';
import App from './App';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';

function AppRouter() {
  return (
    <Routes>
      <Route element={<App />} path="/">
        <Route path="character-detail/:id" element={<CharacterDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
