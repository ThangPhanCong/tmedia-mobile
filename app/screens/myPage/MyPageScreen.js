import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import { goKyc, goSettingScreen } from '../navigation';
import { Navigation } from "react-native-navigation";

export default class MyPageScreen extends Component {
  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      }
    };
  }

  static PAYLOAD_TYPE = {
    PHONE: 'phone',
    SMS_CODE: 'smsCode',
    AUTHENTICATION: 'authenticationCode'
  };

  constructor(props) {
    super(props);
    this.state = {
      phoneVerified: false,
      showVerifyPhone: false,

      googleAuthDisabled: false,
      showVerifyGoogleAuth: false,
      googleVerified: false,

      showChangePassWord: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showRepeatPassWord: false,

      KYCVerified: false,
      payloadAccount: {}
    }
  }

  _goKyc() {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            id: 'kycScreen',
            name: 'Kyc',
            passProps: {
              onPassProp: (data) => this.setState({
                KYCVerified: data
              })
            },
            options: {
              topBar: {
                title: {
                  text: 'Modal'
                }
              }
            }
          }
        }]
      }
    });
  }

  _changePayloadAccount(value, title) {
    const { payloadAccount } = this.state;

    payloadAccount[`${title}`] = value;
    this.setState({ payloadAccount });
  }

  _submitPhone() {
    this.setState({ phoneVerified: true, showVerifyPhone: false })
  }

  _submitAuthentication() {
    this.setState({ googleVerified: true })
  }

  _renderInputAccount(title) {
    const { payloadAccount } = this.state;
    const valueInput = payloadAccount[`${title}`];
    const styleInput = title === MyPageScreen.PAYLOAD_TYPE.PHONE ? [styles.phoneInput, { paddingBottom: 0 }] : [styles.phoneInput, {
      textAlign: 'center',
      height: scale(40)
    }];

    return (
      <TextInput style={styleInput}
                 keyboardType='numeric'
                 underlineColorAndroid='transparent'
                 value={valueInput}
                 onChangeText={value => this._changePayloadAccount(value, title)}
      />
    )
  }

  _renderShowVerifyPhone() {
    const { payloadAccount } = this.state;
    const isSubmitPhone = !payloadAccount.phone || !payloadAccount.smsCode;

    console.log("isSubmitPhone:", isSubmitPhone)
    return (
      <View>
        {
          this.state.showVerifyPhone
            ? (
              <View style={styles.bigRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.nameType}>Phone</Text>
                  <TouchableOpacity style={styles.notVerified}
                                    onPress={() => this.setState({ showVerifyPhone: false })}>
                    <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 1 }]}>Not verified</Text>
                    <View style={{ marginLeft: scale(28) }}>
                      <Image style={styles.arrowRight}
                             source={require('../../../assets/arrow/arrowRight/Shape.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.phoneInputContainer}>
                  <Image style={styles.flagVietNam}
                         source={require('../../../assets/flagVietnamese/VN.png')}/>
                  <Text style={styles.codeVN}>+84</Text>
                  <View style={{ flex: 1, borderBottomColor: '#E0E0E0', borderBottomWidth: scale(1) }}>
                    {this._renderInputAccount(MyPageScreen.PAYLOAD_TYPE.PHONE)}
                  </View>
                </View>

                <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                  <Text style={styles.smsCode}>SMS Code</Text>
                  <View style={{ flex: 1 }}>
                    {this._renderInputAccount(MyPageScreen.PAYLOAD_TYPE.SMS_CODE)}
                  </View>
                </View>

                <View style={styles.groupMpdalPhoneText}>
                  <TouchableOpacity>
                    <Text style={styles.buttonSms}>SMS Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({ showVerifyPhone: false })}>
                    <Text style={styles.buttonCancel}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={!isSubmitPhone ? () => this._submitPhone() : null}>
                    <Text style={[styles.buttonSms, { color: '#10AC84' }]}>OK</Text>
                  </TouchableOpacity>

                </View>
              </View>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>Phone</Text>
                {
                  this.state.phoneVerified
                    ? (
                      <View style={styles.notVerified3}>
                        <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}>+84 01234567890</Text>
                        <Text style={[styles.verifyStatus, { color: '#10AC84', marginLeft: scale(40) }]}>Verified</Text>
                      </View>
                    )
                    : (
                      <TouchableOpacity style={styles.notVerified}
                                        onPress={() => this.setState({ showVerifyPhone: true })}>
                        <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 1 }]}>Not verified</Text>
                        <View style={{ marginLeft: scale(28) }}>
                          <Image style={styles.arrowDown}
                                 source={require('../../../assets/arrow/arrowDown/Shape.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    )
                }
              </View>
            )
        }
      </View>
    )
  }

  __renderShowVerifyGoogleAuth() {
    const { payloadAccount, googleVerified } = this.state;
    const isSubmitAuthentication = !payloadAccount.authenticationCode;

    return (
      <View>
        {
          this.state.showVerifyGoogleAuth
            ? (
              <View style={styles.bigRow}>
                <View style={!googleVerified ? styles.titleRow : styles.titleRowVerified}>
                  <Text style={styles.nameType}>Google Authenicator</Text>

                  {
                    googleVerified
                      ? (
                        <View style={styles.notVerified}>
                          <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}/>
                          <Text style={[styles.verifyStatus, { color: '#10AC84', marginLeft: scale(40) }]}>Verified</Text>
                        </View>
                      )
                      : (
                        <TouchableOpacity style={styles.notVerified}
                                          onPress={() => this.setState({ showVerifyGoogleAuth: false })}>
                          <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 1 }]}>Not verified</Text>
                          <View style={{ marginLeft: scale(28) }}>
                            <Image style={styles.arrowRight}
                                   source={require('../../../assets/arrow/arrowRight/Shape.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      )
                  }
                </View>

                {
                  googleVerified
                    ? (
                      <View/>
                    )
                    : (
                      <View style={styles.qrCodeContainer}>
                        <Image style={styles.qrCode}
                               source={require('../../../assets/qrCode/frame.png')}/>
                      </View>
                    )
                }

                {!googleVerified ? <View>
                    <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                      <Text style={styles.smsCode}>Authenication code</Text>
                      <View style={{ flex: 1 }}>
                        {this._renderInputAccount(MyPageScreen.PAYLOAD_TYPE.AUTHENTICATION)}
                      </View>
                    </View>

                    <View style={[styles.groupMpdalPhoneText, { justifyContent: 'center' }]}>
                      <TouchableOpacity style={{ marginRight: scale(15) }}
                                        onPress={() => this.setState({ showVerifyGoogleAuth: false })}>
                        <Text style={styles.buttonCancel}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: scale(15) }}
                                        onPress={!isSubmitAuthentication ? () => this._submitAuthentication() : () => {
                                        }}>
                        <Text style={[styles.buttonSms, { color: '#10AC84' }]}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  : null
                }
              </View>
            )
            : (
              <View style={styles.row}>
                <Text style={[styles.nameType, { flex: 3 }]}>Google Authenicator</Text>
                {
                  this.state.googleAuthDisabled
                    ? (
                      <View style={styles.notVerified3}>
                        <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}/>
                        <Text style={[styles.verifyStatus, {
                          color: '#576574',
                          marginLeft: scale(40),
                          fontFamily: 'Futura Heavy font'
                        }]}>Disable</Text>
                      </View>
                    )
                    : (
                      <TouchableOpacity style={styles.notVerified3}
                                        onPress={() => this.setState({ showVerifyGoogleAuth: true })}>
                        <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 4 }]}>Not verified</Text>
                        <View style={{ marginLeft: scale(28) }}>
                          <Image style={styles.arrowDown}
                                 source={require('../../../assets/arrow/arrowDown/Shape.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    )
                }
              </View>
            )
        }
      </View>
    )
  }

  __renderShowChangePassWord() {
    return (
      <View>
        {
          this.state.showChangePassWord
            ? (
              <View style={styles.bigRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.nameType}>Change password</Text>
                  <TouchableOpacity style={styles.notVerified}
                                    onPress={() => this.setState({ showChangePassWord: false })}>
                    <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 1 }]}/>
                    <View style={{ marginLeft: scale(28) }}>
                      <Image style={styles.arrowRight}
                             source={require('../../../assets/arrow/arrowRight/Shape.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                  <Text style={[styles.smsCode, { flex: 1 }]}>Current password</Text>
                  <View style={{ flex: 1.5 }}>
                    <TextInput style={[styles.phoneInput, { height: scale(40) }]}
                               underlineColorAndroid='transparent'
                               secureTextEntry={!this.state.showCurrentPassword}
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                  <TouchableOpacity
                    onPressIn={() => this.setState({ showCurrentPassword: true })}
                    onPressOut={() => this.setState({ showCurrentPassword: false })}>
                    <Image style={styles.eye}
                           source={require('../../../assets/eye/view.png')}/>

                  </TouchableOpacity>
                </View>

                <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                  <Text style={[styles.smsCode, { flex: 1 }]}>New password</Text>
                  <View style={{ flex: 1.5 }}>
                    <TextInput style={[styles.phoneInput, { height: scale(40) }]}
                               underlineColorAndroid='transparent'
                               secureTextEntry={!this.state.showNewPassword}
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                  <TouchableOpacity
                    onPressIn={() => this.setState({ showNewPassword: true })}
                    onPressOut={() => this.setState({ showNewPassword: false })}>
                    <Image style={styles.eye}
                           source={require('../../../assets/eye/view.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                  <Text style={[styles.smsCode, { flex: 1 }]}>Repeat password</Text>
                  <View style={{ flex: 1.5 }}>
                    <TextInput style={[styles.phoneInput, { height: scale(40) }]}
                               underlineColorAndroid='transparent'
                               secureTextEntry={!this.state.showRepeatPassWord}
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                  <TouchableOpacity
                    onPressIn={() => this.setState({ showRepeatPassWord: true })}
                    onPressOut={() => this.setState({ showRepeatPassWord: false })}>
                    <Image style={styles.eye}
                           source={require('../../../assets/eye/view.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={[styles.groupMpdalPhoneText, { justifyContent: 'center' }]}>
                  <TouchableOpacity style={{ marginRight: scale(15) }}
                                    onPress={() => this.setState({ showChangePassWord: false })}>
                    <Text style={styles.buttonCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: scale(15) }}>
                    <Text style={[styles.buttonSms, { color: '#10AC84' }]}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>Change password</Text>
                <TouchableOpacity style={styles.notVerified}
                                  onPress={() => this.setState({ showChangePassWord: true })}>
                  <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 1 }]}/>
                  <View style={{ marginLeft: scale(28) }}>
                    <Image style={styles.arrowDown}
                           source={require('../../../assets/arrow/arrowDown/Shape.png')}
                    />
                  </View>
                </TouchableOpacity>

              </View>
            )
        }
      </View>
    )
  }

  _renderShowKYC() {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.nameType}>KYC</Text>
          {
            this.state.KYCVerified
              ? (
                <View style={styles.notVerified3}>
                  <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}/>
                  <Text style={[styles.verifyStatus, { color: '#10AC84', marginLeft: scale(40) }]}>Verified</Text>
                </View>
              )
              : (
                <TouchableOpacity style={styles.notVerified} onPress={() => this._goKyc()}>
                  <Text style={[styles.verifyStatus, { color: '#D0021B', flex: 1 }]}>Not verified</Text>
                  <View style={{ marginLeft: scale(28) }}>
                    <Image style={styles.arrowRight}
                           source={require('../../../assets/arrow/arrowRight/Shape.png')}
                    />
                  </View>
                </TouchableOpacity>
              )
          }

        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>dung.nguyen@sotatek.com</Text>
          <TouchableOpacity onPress={() => goSettingScreen()}>
            <Image style={styles.iconSetting}
                   source={require('../../../assets/setting/Shape.png')}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingRight: scale(30), paddingLeft: scale(30), marginTop: scale(20) }}>
          {this._renderShowVerifyPhone()}
          {this.__renderShowVerifyGoogleAuth()}
          {this.__renderShowChangePassWord()}
          {this._renderShowKYC()}
        </ScrollView>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontFamily: 'Futura Book font',
    color: '#576574',
    fontSize: '20@s',
  },
  row: {
    marginBottom: '20@s',
    height: '56@s',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: '28@s',
    alignItems: 'center',
    paddingLeft: '20@s',
    paddingRight: '28@s',
    justifyContent: 'space-between'
  },
  nameType: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574',
    flex: 1,
    lineHeight: '15@s'
  },
  verifyStatus: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    lineHeight: '15@s',
    textAlign: 'right',
  },
  arrowDown: {
    width: '10@s',
    height: '6@s',
  },
  arrowRight: {
    width: '6@s',
    height: '10@s'
  },
  bigRow: {
    marginBottom: '20@s',
    backgroundColor: '#ffffff',
    borderRadius: '28@s',
    // height: '150@s'
  },
  titleRow: {
    flexDirection: 'row',
    // borderBottomWidth: '1@s',
    // borderBottomColor: '#E0E0E0',
    height: '36.5@s',
    alignItems: 'center',
    paddingLeft: '20@s',
    paddingRight: '28@s',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s'
  },
  titleRowVerified: {
    flexDirection: 'row',
    // borderBottomWidth: '1@s',
    // borderBottomColor: '#E0E0E0',
    height: '36.5@s',
    alignItems: 'center',
    paddingLeft: '20@s',
    paddingRight: '28@s',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: '20@s',
    marginRight: '20@s'
  },
  flagVietNam: {
    width: '28@s',
    height: '20@s'
  },
  codeVN: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574',
    marginLeft: '6@s',
    marginRight: '10.5@s',
    marginBottom: '3@s'
  },
  phoneInput: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574',
    height: '30@s',
    paddingBottom: '9@s',
    paddingLeft: '10@s',
    paddingRight: '10@s'
  },
  smsCode: {
    fontFamily: 'Futura Book font',
    fontSize: '12@s',
    color: '#576574',
  },
  smsInputContainer: {
    height: scale(40), borderBottomWidth: scale(1), borderBottomColor: '#E0E0E0', alignItems: 'center'
  },
  groupMpdalPhoneText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: '30@s',
    paddingRight: '30@s',
    height: '40@s'
  },
  buttonSms: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#2E86DE'
  },
  buttonCancel: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574'
  },
  qrCodeContainer: {
    alignItems: 'center',
    paddingTop: '20@s',
    paddingBottom: '20@s',
  },
  qrCode: {
    width: '100@s',
    height: '100@s'
  },
  eye: {
    width: '18@s',
    height: '11@s'
  },
  notVerified: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  notVerified3: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#ffffff', height: '60@s',
    paddingLeft: '30@s', paddingRight: '28@s'
  },
  iconSetting: {
    width: '20@s', height: '20@s'
  }
});