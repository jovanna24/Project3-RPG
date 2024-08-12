import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx';
import Profile from '../src/pages/Profile/Profile.jsx';
// import DefaultProfile from '../src/pages/DefaultProfile/DefaultProfile.jsx'; //new component for default profile view
import App from './App.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
