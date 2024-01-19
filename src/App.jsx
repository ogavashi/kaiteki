import { RouterProvider } from 'react-router-dom';
import { router } from './features/navigation';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
