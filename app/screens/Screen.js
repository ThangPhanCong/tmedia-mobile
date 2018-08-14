import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('./login/LoginScreen').default);
  Navigation.registerComponent('Register', () => require('./register/RegisterScreen').default);
  Navigation.registerComponent('Ico', () => require('./ico/IcoScreen').default);
}