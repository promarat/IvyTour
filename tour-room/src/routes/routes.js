import Guide from '../Guide'
import Student from '../Student'
import HostScreen from '../pages/host/HostScreen';
import LoginScreen from '../pages/login/LoginScreen';
import GuestScreen from '../pages/guest/GuestScreen';

const routes = [
  { path: '/', component: LoginScreen, exact: true },
  { path: '/login', component: LoginScreen, exact: true },
  { path: '/guide', component: Guide, exact: true },
  { path: '/student', component: Student, exact: false },
  { path: '/host', component: HostScreen, exact: true },
  { path: '/guest', component: GuestScreen, exact: false },
];

export { routes };
