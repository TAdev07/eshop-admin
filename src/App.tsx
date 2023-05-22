import './App.css';
import { useRoutes } from 'react-router-dom';
import mainRoutes from 'routes';

export default function App() {
  return useRoutes([mainRoutes]);
}
