import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

class RegisterScreen extends PureComponent {
  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      }
    };
  }

  render() {
    return (
      <View style={styles.screen}>
        <Image source={require('../../../assets/backgroundLogin/backgroundLogin.png')}
               style={styles.imgBackgroundLogin}/>

        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.png')} style={styles.imgLogo}/>
        </View>

        <View style={styles.inputEmailContainer}>
          <Image source={require('../../../assets/emailOutline/new-email-outline.png')} style={styles.imgEmail}/>
          <TextInput style={styles.inputRegister}/>

          <Image source={require('../../../assets/verified/verified.png')}
                 style={styles.imgVerified}/>
        </View>

        <View style={styles.inputPasswordContainer}>
          <Image source={require('../../../assets/padlock/padlock.png')} style={styles.imgPadlock}/>

          <View style={{ flexDirection: 'column' }}>
            <View style={styles.viewInputPassword}>
              <TextInput style={styles.inputRegister}
                // value={password}
                         secureTextEntry={true}
                // onChangeText={(p) => this._changePassword(p)}
              />
            </View>


            <View style={styles.dividerSignUp}></View>
            <View style={styles.viewConfirmPassword}>
              <TextInput style={styles.inputRegister}
                // value={password}
                         secureTextEntry={true}
                // onChangeText={(p) => this._changePassword(p)}
              />

              <Image source={require('../../../assets/verified/verified.png')}
                     style={styles.imgVerified}/>
            </View>
          </View>


        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.textSignUp}>SIGN UP</Text>
        </View>

        <View style={styles.termContainer}>
          <Text style={styles.textCreating}>By creating an account, you agree to our</Text>
          <Text style={styles.textTerm}>Terms & Conditions <Text style={styles.dividerTerm}> | </Text> Policy
            <Text style={styles.dividerTerm}>  | </Text> White Paper
            <Text style={styles.dividerTerm}>  | </Text> Token Sale Agreements</Text>
        </View>
      </View>
    )
  }
}

export default RegisterScreen;

const styles = ScaledSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  },
  imgBackgroundLogin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: '70@s'
  },
  imgLogo: {
    width: '100@s',
    height: '116@s',
  },
  inputEmailContainer: {
    flexDirection: 'row',
    marginLeft: '40@s',
    marginRight: '40@s',
    borderColor: '#FFF',
    borderWidth: '1@s',
    alignItems: 'center',
    borderRadius: '3@s',
    height: '40@s',
    width: '295@s',
    marginTop: '80@s'
  },
  imgEmail: {
    width: '17@s',
    height: '11@s',
    marginLeft: '13@s',
    marginRight: '18@s',
  },
  inputRegister: {
    flex: 1,
    color: '#FFF',
    height: '40@s',
  },
  imgVerified: {
    width: '20@s',
    height: '20@s',
    marginRight: '8@s'
  },
  inputPasswordContainer: {
    flexDirection: 'row',
    marginLeft: '40@s',
    marginRight: '40@s',
    borderColor: '#FFF',
    borderTopWidth: 0,
    borderWidth: '1@s',
    alignItems: 'flex-start',
    borderRadius: '3@s',
    width: '295@s',
  },
  imgPadlock: {
    width: '11@s',
    height: '16@s',
    marginLeft: '18@s',
    marginRight: '16@s',
    marginTop: '10@s',
  },
  signUpContainer: {
    height: '40@s',
    width: '295@s',
    flexDirection: 'row',
    marginLeft: '40@s',
    marginRight: '40@s',
    marginTop: '30@s',
    alignItems: 'center',
    borderRadius: '3@s',
    justifyContent: 'center',
    backgroundColor: 'rgba(216, 216, 216, 0.3)'
  },
  textSignUp: {
    fontSize: '16@s',
    color: '#FFF'
  },
  dividerSignUp: {
    backgroundColor: '#E0E0E0',
    width: '248@s',
    height: '1@s'
  },
  viewInputPassword: {
    height: '40@s'
  },
  viewConfirmPassword: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  termContainer: {
    flexDirection: 'column',
    marginTop: '40@s',
    position: 'absolute',
    top: '87%',
    alignItems: 'center'
  },
  textTerm: {
    color: '#FFF',
    textAlign: 'center',
    marginLeft: '20@s',
    fontSize: '10@s',
    letterSpacing: '0.5@s',
  },
  textCreating: {
    color: '#FFF',
    textAlign: 'center',
    marginLeft: '20@s',
    fontSize: '10@s',
    letterSpacing: '0.5@s',
  },
  dividerTerm: {
    color: '#979797',
    fontSize: '10@s',
  }
});
