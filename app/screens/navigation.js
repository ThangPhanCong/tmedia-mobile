import { Navigation } from "react-native-navigation";
import { scale } from "../libs/reactSizeMatter/scalingUtils";

export const goMain = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      children: [{
        stack: {
          children: [{
            component: {
              name: 'Ico',
              passProps: {
                text: 'This is tab 1'
              },
              bottomTabs: {
                height: scale(49)
              }
            }
          }],
          options: {
            bottomTab: {
              title: 'Tab 1',
              text: 'Ico',
              icon: require('../../assets/icoTab/ico.png'),
              selectedIconColor: '#576574',
              selectedTextColor: '#576574',
            },

          }
        }
      },
        {
          component: {
            name: 'Register',
            passProps: {
              text: 'This is tab 2'
            },
            options: {
              bottomTab: {
                title: 'Tab 2',
                text: 'Wallet',
                icon: require('../../assets/walletTab/wallet-filled-commercial-tool.png'),
                selectedIconColor: '#576574',
                selectedTextColor: '#576574',
              },
              bottomTabs: {
              }
            }
          }
        },
        {
          component: {
            name: 'MyPage',
            passProps: {
              text: 'This is tab 2'
            },
            options: {
              bottomTab: {
                title: 'Tab 3',
                text: 'Account',
                icon: require('../../assets/userTab/user.png'),
                selectedIconColor: '#576574',
                selectedTextColor: '#576574',
              },
              bottomTabs: {
              }
            }
          }
        }
      ]
    }
  }
});

export const goQrCode = () => Navigation.showOverlay({
  component: {
    id:'overlayQrcode',
    name: 'QrCode',
    options: {
      overlay: {
        interceptTouchOutside: true
      }
    }
  }
});

