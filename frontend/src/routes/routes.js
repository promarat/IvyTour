import HomeScreen from '../pages/home/HomeScreen';
import LoginScreen from '../pages/login/LoginScreen';
import SignupScreen from '../pages/login/SignupScreen';
import VerifyScreen from '../pages/login/VerifyScreen';
import PersonalScreen from '../pages/login/PersonalScreen';
import SearchScreen from '../pages/search/SearchScreen';
import ConfirmLoginScreen from '../pages/login/ConfirmLoginScreen';
import BookScreen from '../pages/book/BookScreen';
import ConfirmBookScreen from '../pages/book/ConfirmBookScreen';
import DashboardScreen from '../pages/inner/DashboardScreen';
import ProfileScreen from '../pages/inner/ProfileScreen';
import PasswordScreen from '../pages/inner/PasswordScreen';
import MyTourScreen from '../pages/inner/MyTourScreen';
import ExploreScreen from '../pages/user/ExploreScreen';
import PaymentScreen from '../pages/payment/PaymentScreen';
import SelectGuideScreen from '../pages/book/SelectGuideScreen';
import ScheduleScreen from '../pages/guide/ScheduleScreen';

const frontRoutes = [
  { path: '/', component: HomeScreen, exact: true },
  { path: '/login', component: LoginScreen, exact: true },
  { path: '/signup', component: SignupScreen, exact: true },
  { path: '/verify', component: VerifyScreen, exact: true },
  { path: '/personal', component: PersonalScreen, exact: true },
  { path: '/search', component: SearchScreen, exact: true },
  { path: '/needlogin', component: ConfirmLoginScreen, exact: true },
  { path: '/book', component: BookScreen, exact: true },
  { path: '/confirmbook', component: ConfirmBookScreen, exact: true },
  { path: '/selectguide', component: SelectGuideScreen, exact: true },
];

const innerRoutes = [
  { path: '/dashboard', component: DashboardScreen, exact: true },
  { path: '/profile', component: ProfileScreen, exact: true },
  { path: '/password', component: PasswordScreen, exact: true },
  { path: '/mytour', component: MyTourScreen, exact: true },
  { path: '/explore', component: ExploreScreen, exact: true },
  { path: '/payment', component: PaymentScreen, exact: true },
  { path: '/schedule', component: ScheduleScreen, exact: true },
];

export { frontRoutes, innerRoutes };
