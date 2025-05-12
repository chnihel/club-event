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
import DetailsClubPage from "../pages/DetailsClubPage";
import Login from "../views/login/login";
import RegisterMembre from "../views/register/registerMembre";
import RegisterDerigeant from "../views/register/registerDerigeant";
import Forget from "../views/resetPassword/forget";
import Reset from "../views/resetPassword/reset";
import PrivateRoute from "../component/privateRoute";
import ListClubsDirigeant from "../views/homeDerigeant/listClubCreer";
import HomeClubs from "../views/homeDerigeant/homeClubs";
import EventContainer from "../views/homeDerigeant/EventContainer";
import MembreSuivi from "../views/homeDerigeant/membreSuivi";
import MembreBureau from "../views/homeDerigeant/membreBureau";
import HomeAdmin from "../views/homeAdmin/homeAdmin";
import ListClubs from "../views/homeAdmin/ListClubs";
import StripePaiementPage from "../component/paiement";
import StripePaiementPageClub from "../component/paiementClub";
import ListMembreEvent from "../views/homeDerigeant/listMembreEvent";
import ClubResources from "../views/homeDerigeant/ressourceDerigeant";
import Guide from "../views/homeDerigeant/guide";
import Reglement from "../views/homeDerigeant/reglement";
import Multimedia from "../views/homeDerigeant/multimedia";
import Tutoriel from "../views/homeDerigeant/tuotriel";
import ClubSuivi from "../views/home/clubSuivi";
import GuideMembre from "../views/home/guideMembre";
import ReglementMembre from "../views/home/reglementMembre";
import MultimediaMembre from "../views/home/multimediaMembre";
import TutorielMembre from "../views/home/tutorielMembre";
import NotificationProvider from "../component/NotificationProvider";
import ForumDerigeant from "../views/homeDerigeant/formDerigeant";
import InboxDerigeant from "../views/homeDerigeant/inboxDerigeant";
import CalendrierDergeneant from "../views/homeDerigeant/calendrier";
import HomeVisiteur from "../views/homeVisiteur/homeVisiteur";
import ListEvent from "../views/homeVisiteur/listEvent";
import DetailsClubPageForVisiteur from "../views/homeVisiteur/detailsClub";
import Gallerie from "../views/homeVisiteur/gallerie";
import Rapport from "../views/homeDerigeant/rapport";

const router = createBrowserRouter([
  {
     path:'/',
     element:<HomePage/>
  },
  {
    path: '/homeAdmin',
    element:<PrivateRoute><HomeAdmin /></PrivateRoute> ,
    children:[
      { 
        index:true,
        element: <ListClubs />,
      },
      { 
        path: 'profile',
        element: <Profile />,
      },
      { 
        path: 'newpassword',
        element: <ChangerPassword />,
      },
    ]
  },

  //route de visiteur
  {
    path: '/homevisiteur',
    element:<HomeVisiteur /> ,
    children:[
      { 
        index:true,
        element: <ListEvent />,
      },
      { 
        path:"detailsClub/:id",
        element: <DetailsClubPageForVisiteur />,
      },
      { 
        path:"gallerie/:id",
        element: <Gallerie />,
      },
    ]},
    {
      path: '/homeMembre',
      element:<PrivateRoute> <NotificationProvider>
      <Home />
    </NotificationProvider></PrivateRoute> ,
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
            path: 'clubSuivi',
            element: <ClubSuivi />,
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
             
            path: 'inbox/:id',
            element: <Inbox />,
          },
          {
             
            path: 'calendrier',
            element: <Calendrier />,
          },
          {
             
            path: 'forum/:id',
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
            
             
            path: 'guide',
            element: <GuideMembre />,
          },
          {
            path: 'reglement',
            element: <ReglementMembre />,
          },
          {
            path: 'multimedia',
            element: <MultimediaMembre />,
          },
          {
            path: 'tutoriel',
            element: <TutorielMembre />,
          },
          {
             
            path: 'join',
            element: <JoinNow />,
          },
          { 
            path:'detailsClub/:id',
            element: <DetailsClubPage />,
          },
          {
             
            path:'paiement/event/:eventId/:membreId',
            element: <StripePaiementPage />,
          },
          {
             
            path:'paiement/:clubId/:membreId',
            element: <StripePaiementPageClub />,
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
        {
          path: "membreSuivi",
          element: <MembreSuivi />,
        },
        {
          path: "membreBureau",
          element: <MembreBureau />,
        },
        {
          path: "MembreEvent/:eventId",
          element: <ListMembreEvent />,
        },
        {
          path: "ressource",
          element: <ClubResources />,
        },
        {
          path: "guide",
          element: <Guide />,
        },
        {
          path: "reglement",
          element: <Reglement />,
        },
        {
          path: "multimedia",
          element: <Multimedia />,
        },
        {
          path: "tutoriel",
          element: <Tutoriel />,
        },
        {
          path: "form",
          element: <ForumDerigeant />,
        },
        {
          path: "inbox",
          element: <InboxDerigeant />,
        },
        {
          path: "calendrier",
          element: <CalendrierDergeneant />,
        },
         {
          path: "rapport",
          element: <Rapport />,
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