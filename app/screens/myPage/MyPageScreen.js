import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";


export default class MyPageScreen extends PureComponent {
  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      }
    };
  }

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

      KYCVerified: false
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.title}>dung.nguyen@sotatek.com</Text>
        <ScrollView style={{paddingRight: scale(30)}}>
          {
            this.state.showVerifyPhone
              ? (
                <View style={styles.bigrow}>
                  <View style={styles.titleRow}>
                    <Text style={styles.nameType}>Phone</Text>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
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
                      <TextInput style={[styles.phoneInput, { paddingBottom: 0 }]}
                                 keyboardType='numeric'
                                 underlineColorAndroid='transparent'
                        // value={password}
                        // onChangeText={(p) => this._changePassword(p)}
                      />
                    </View>
                  </View>

                  <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                    <Text style={styles.smsCode}>SMS Code</Text>
                    <View style={{ flex: 1 }}>
                      <TextInput style={[styles.phoneInput, { textAlign: 'center', height: scale(40) }]}
                                 keyboardType='numeric'
                                 underlineColorAndroid='transparent'
                        // value={password}
                        // onChangeText={(p) => this._changePassword(p)}
                      />
                    </View>
                  </View>

                  <View style={styles.groupMpdalPhoneText}>
                    <TouchableOpacity>
                      <Text style={styles.buttonSms}>SMS Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ showVerifyPhone: false })}>
                      <Text style={styles.buttonCancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity><Text style={[styles.buttonSms, { color: '#10AC84' }]}>OK</Text></TouchableOpacity>

                  </View>
                </View>
              )
              : (
                <View style={styles.row}>
                  <Text style={styles.nameType}>Phone</Text>
                  {
                    this.state.phoneVerified
                      ? (
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}>+84 01234567890</Text>
                          <Text style={[styles.verifyStatus, { color: '#10AC84', marginLeft: scale(40) }]}>Verified</Text>
                        </View>
                      )
                      : (
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
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

          {
            this.state.showVerifyGoogleAuth
              ? (
                <View style={styles.bigrow}>
                  <View style={styles.titleRow}>
                    <Text style={styles.nameType}>Google Authenicator</Text>

                    {
                      this.state.googleVerified
                        ? (
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}/>
                            <Text style={[styles.verifyStatus, { color: '#10AC84', marginLeft: scale(40) }]}>Verified</Text>
                          </View>
                        )
                        : (
                          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
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
                    this.state.googleVerified
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

                  <View style={[styles.phoneInputContainer, styles.smsInputContainer]}>
                    <Text style={styles.smsCode}>Authenication code</Text>
                    <View style={{ flex: 1 }}>
                      <TextInput style={[styles.phoneInput, { textAlign: 'center', height: scale(40) }]}
                                 keyboardType='numeric'
                                 underlineColorAndroid='transparent'
                        // value={password}
                        // onChangeText={(p) => this._changePassword(p)}
                      />
                    </View>
                  </View>

                  <View style={[styles.groupMpdalPhoneText, { justifyContent: 'center' }]}>
                    <TouchableOpacity style={{ marginRight: scale(15) }}
                                      onPress={() => this.setState({ showVerifyGoogleAuth: false })}>
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
                  <Text style={[styles.nameType, { flex: 3 }]}>Google Authenicator</Text>
                  {
                    this.state.googleAuthDisabled
                      ? (
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}/>
                          <Text style={[styles.verifyStatus, {
                            color: '#576574',
                            marginLeft: scale(40),
                            fontFamily: 'Futura Heavy font'
                          }]}>Disable</Text>
                        </View>
                      )
                      : (
                        <TouchableOpacity style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}
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

          {
            this.state.showChangePassWord
              ? (
                <View style={styles.bigrow}>
                  <View style={styles.titleRow}>
                    <Text style={styles.nameType}>Change password</Text>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
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
                    <Text style={[styles.smsCode, {flex: 1}]}>Current password</Text>
                    <View style={{ flex: 1.5 }}>
                      <TextInput style={[styles.phoneInput, {height: scale(40)}]}
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
                    <Text style={[styles.smsCode, {flex: 1}]}>New password</Text>
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
                    <Text style={[styles.smsCode, {flex: 1}]}>Repeat password</Text>
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
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
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

          <View style={styles.row}>
            <Text style={styles.nameType}>KYC</Text>
            {
              this.state.KYCVerified
                ? (
                  <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.verifyStatus, { color: '#576574', flex: 1 }]}/>
                    <Text style={[styles.verifyStatus, { color: '#10AC84', marginLeft: scale(40) }]}>Verified</Text>
                  </View>
                )
                : (
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
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
        </ScrollView>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: '30@s',
    paddingRight: 0,
  },
  title: {
    fontFamily: 'Futura Book font',
    color: '#576574',
    fontSize: '20@s',
    marginBottom: '20@s'
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
  bigrow: {
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
  }
});