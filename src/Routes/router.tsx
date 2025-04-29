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
import HomePage from "../pages/accueil";
import HomeDerigeant from "../views/homeDerigeant/homeDerigeantForClub";
import DashbordDerigeant from "../pages/dashbordDerigeant";
import ClubDetails from "../component/pageClub";
import DetailsClubPage from "../pages/DetailsClubPage";
import Login from "../views/login/login";
import RegisterMembre from "../views/register/registerMembre";
import RegisterDerigeant from "../views/register/registerDerigeant";
import Forget from "../views/resetPassword/forget";
import Reset from "../views/resetPassword/reset";
import PrivateRoute from "../component/privateRoute";
import ListClubsDirigeant from "../views/homeDerigeant/listClubCreer";
import HomeClubs from "../views/homeDerigeant/homeClubs";
import AddEvent from "../views/homeDerigeant/addEvent";
import EventContainer from "../views/homeDerigeant/EventContainer";

const router = createBrowserRouter([
  {
     path:'/',
     element:<HomePage/>
  },
    {
      path: '/homeMembre',
      element:<PrivateRoute><Home /></PrivateRoute> ,
      children: [
        { 
          index:true,
          element: <Dashbord />,
        },
        { 
            path: 'profile',
            element: <Profile />,
          },
          { 
            path: 'newpassword',
            element: <ChangerPassword />,
          },
          { 
            path: 'listClub',
            element: <ListeClubSuivi />,
          },
          {
             
            path: 'inbox',
            element: <Inbox />,
          },
          {
             
            path: 'calendrier',
            element: <Calendrier />,
          },
          {
             
            path: 'forum',
            element: <Forum />,
          },
          {
             
            path: 'notif',
            element: <Notifications />,
          },
          {
             
            path: 'resource',
            element: <Ressources />,
          },
          {
             
            path: 'join',
            element: <JoinNow />,
          },
          { 
            path:'detailsClub',
            element: <DetailsClubPage />,
          },
      ],
    },
    {
      path: '/homeDerigeant',
      element:<PrivateRoute><HomeClubs /></PrivateRoute> ,
      children: [
        { 
          index:true,
          element: <ListClubsDirigeant />,
        },
        { 
          path: 'profile',
          element: <Profile />,
        },
        { 
          path: 'newpassword',
          element: <ChangerPassword />,
        },
       
       
      ],
    },
    {
      path: '/homeDerigeant/:clubId',
      element: <PrivateRoute><HomeDerigeant /></PrivateRoute>,
      children: [
        {
          index: true,
          element: <DashbordDerigeant />,
        },
        {
          path: "event",
          element: <EventContainer />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/registerMembre',
      element: <RegisterMembre />,
    },
    {
      path: '/registerDerigeant',
      element: <RegisterDerigeant />,
    },
    {
      path: '/forget',
      element: <Forget />,
    },
    {
      path: '/reset',
      element: <Reset />,
    }

  ]);
  
  export default router;