import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home/home";
import Dashbord from "../pages/dashbord";
import Profile from "../views/home/profile";
import ChangerPassword from "../views/home/changerPassword/changerPassword";
import ListeClubSuivi from "../views/home/listClub/listeClubSuivi";
import Inbox from "../views/home/inbox";
import Calendrier from "../views/home/calendrier";
import Forum from "../views/home/forum";
import Notifications from "../views/home/notification";
import Ressources from "../views/home/resource";
import JoinNow from "../views/home/joinNow";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        { 
          path: '/',
          element: <Dashbord />,
        },
        { 
            path: '/profile',
            element: <Profile />,
          },
          { 
            path: '/newpassword',
            element: <ChangerPassword />,
          },
          { 
            path: '/listClub',
            element: <ListeClubSuivi />,
          },
          {
             
            path: '/inbox',
            element: <Inbox />,
          },
          {
             
            path: '/calendrier',
            element: <Calendrier />,
          },
          {
             
            path: '/forum',
            element: <Forum />,
          },
          {
             
            path: '/notif',
            element: <Notifications />,
          },
          {
             
            path: '/resource',
            element: <Ressources />,
          },
          {
             
            path: '/join',
            element: <JoinNow />,
          },
      ],
    }
  ]);
  
  export default router;