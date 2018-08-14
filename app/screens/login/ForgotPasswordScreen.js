import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

class ForgotPasswordScreen extends PureComponent {
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

        <Image source={require('../../../assets/back/back.png')}
               style={styles.imgBack}/>

        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/bigLock/biglLock.png')} style={styles.imgLogo}/>
          <View style={styles.titleContatiner}>
            <Text style={styles.title1}>Forgot password?</Text>
            <Text style={styles.title2}>Just send us your registration email</Text>
          </View>
        </View>

        <View styles={styles.inputContainer}>
          <Image source={require('../../../assets/emailOutline/new-email-outline.png')} style={styles.imgEmail}/>
          <TextInput style={styles.inputRegister}
                     keyboardType='email-address'
                     underlineColorAndroid='transparent'
                     placeholder="Email"
                     placeholderTextColor='#fff'
            // value={password}
            // onChangeText={(p) => this._changePassword(p)}
          />
        </View>
        <TouchableOpacity style={styles.signUpContainer}>
          <Text style={styles.textSignUp}>RESET PASSWORD</Text>
        </TouchableOpacity>

        <View style={styles.termContainer}>
          <Text style={styles.textTerm}>Terms & Conditions <Text style={styles.dividerTerm}> | </Text> Policy
            <Text style={styles.dividerTerm}> | </Text> White Paper
            <Text style={styles.dividerTerm}> | </Text> Token Sale Agreements</Text>
        </View>
      </View>
    )
  }
}

export default ForgotPasswordScreen;

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
  imgBack: {
    width: '11@s',
    height: '20@s',
    marginTop: '10@s',
    marginLeft: '18@s',
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: '70@s'
  },
  imgLogo: {
    width: '59@s',
    height: '80@s',
  },
  inputRegister: {
    marginLeft: '40@s',
    marginRight: '40@s',
    color: '#FFF',
    height: '50@s',
    paddingLeft: '60@s',
    paddingRight: '15@s',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
    fontSize: '13@s'
  },
  signUpContainer: {
    height: '40@s',
    width: '295@s',
    flexDirection: 'row',
    marginLeft: '40@s',
    marginRight: '40@s',
    marginTop: '20@s',
    alignItems: 'center',
    borderRadius: '3@s',
    justifyContent: 'center',
    backgroundColor: 'rgba(216, 216, 216, 0.3)'
  },
  textSignUp: {
    fontSize: '16@s',
    color: '#FFF'
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
  },
  titleContatiner: {
    marginTop: '10@s',
    flex: 0.5
  },
  title1: {
    color: '#D8D8D8',
    textAlign: 'center',
    fontSize: '20@s',
    lineHeight: '23@s',
  },
  title2: {
    textAlign: 'center',
    color: '#D8D8D8',
    fontSize: '15@s',
    lineHeight: '18@s',
    marginTop: '10@s'
  },
  imgEmail: {
    width: '17@s',
    height: '11@s',
    position: 'absolute',
    top: '20@s',
    left: '57@s'
  },
  inputContainer: {
    flexDirection: 'row',

  }
});
