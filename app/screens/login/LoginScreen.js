import React, {PureComponent} from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

class LoginScreen extends PureComponent{
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
    return(
      <View style={styles.screen}>
        <Image source={require('../../../assets/backgroundLogin/backgroundLogin.png')} style={styles.imgBackgroundLogin} />

        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/logo.png')} style={styles.imgLogo} />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../../assets/email/email.png')} style={styles.imgEmail}/>
          <TextInput style={styles.inputLogin} value={'dungnguyen@sotatek.com'}/>
          <Image source={require('../../../assets/arrowRightRound/arrowRightRound.png')} style={styles.imgArrowRight}/>
        </View>

        <View style={styles.forgotContainer}>
          <Text style={styles.textForgotPassword}>Forgot password</Text>
          <View style={styles.orContanier}>
            <View style={styles.divider}></View>
            <View>
              <Text style={styles.textOr}>OR</Text>
            </View>
            <View style={styles.divider}></View>
          </View>
        </View>
      </View>
    )
  }
}

export default LoginScreen;

const styles = ScaledSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  },
  imgBackgroundLogin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: '30@s'
  },
  imgLogo: {
    width: '100@s',
    height: '116@s',
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: '40@s',
    marginRight: '40@s',
    borderColor: '#FFF',
    borderWidth: '1@s',
    alignItems: 'center',
    borderRadius: '3@s',
    height: '48@s'
  },
  inputLogin: {
    flex: 1,
    color: '#FFF'
  },
  imgEmail: {
    width: '18@s',
    height: '12@s',
    marginLeft: '18@s',
    marginRight: '18@s',
  },
  imgArrowRight: {
    width: '20@s',
    height: '20@s',
    marginRight: '8@s'
  },
  forgotContainer: {
    alignItems: 'center',
    marginTop: '70@s'
  },
  orContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '25@s'
  },
  textForgotPassword: {
    fontSize: '12@s',
    color: '#FFF',
  },
  divider: {
    width: '84@s',
    height: '2@s',
    backgroundColor: '#858686'
  },
  textOr: {
    fontSize: '15@s',
    color: '#FFF',
    marginLeft: '15@s',
    marginRight: '15@s',
  }
});