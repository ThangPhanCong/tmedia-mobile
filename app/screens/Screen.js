import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('./login/LoginScreen').default);
  Navigation.registerComponent('Register', () => require('./register/RegisterScreen').default);
  Navigation.registerComponent('ForgotPassword', () => require('./login/ForgotPasswordScreen').default);
  Navigation.registerComponent('Otp', () => require('./otp/OtpScreen').default);
  Navigation.registerComponent('Ico', () => require('./ico/IcoScreen').default);
  Navigation.registerComponent('MyPage', () => require('./myPage/MyPageScreen').default);
  Navigation.registerComponent('QrCode', () => require('./qrCode/QrCodeScreen').default);
  Navigation.registerComponent('Kyc', () => require('./kyc/KycScreen').default);
}