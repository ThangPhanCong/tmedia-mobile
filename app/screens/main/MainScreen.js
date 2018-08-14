import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';
import {Navigation} from 'react-native-navigation';
import { registerScreens } from '../../../app/screens/Screen';

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);
    this._initTab();
  }

  _initTab() {
    try {
      registerScreens();

      Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
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
                        position: 'absolute',
                        top: '10@s'
                      }
                    }
                  }],
                  options: {
                    bottomTab: {
                      title: 'Tab 1',
                      icon: require('../../../assets/enter/enter.png'),
                    },

                  }
                }
              },
                {
                  component: {
                    name: 'Ico',
                    passProps: {
                      text: 'This is tab 2'
                    },
                    options: {
                      bottomTab: {
                        title: 'Tab 2',
                        icon: require('../../../assets/enter/enter.png'),
                      },
                      bottomTabs: {
                        backgroundColor: 'red'
                      }
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
                        icon: require('../../../assets/enter/enter.png'),
                      },
                      bottomTabs: {
                        backgroundColor: 'red'
                      }
                    }
                  }
                },

              ]
            }
          }
        });
      });

    } catch (e) {
      console.log(e)
    }

  }
  static get options() {

    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },
    };
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>Main</Text>
      </View>
    )
  }
}

export default MainScreen;