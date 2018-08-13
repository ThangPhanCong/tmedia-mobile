import {Navigation} from 'react-native-navigation';
import {registerScreens} from './app/screens/Screen';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Register',
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: 'Blog'
            }
          }
        }
      }
    }
  });
});