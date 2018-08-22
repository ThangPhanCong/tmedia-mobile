import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import { disMissSetting } from '../navigation';
import Modal from 'react-native-modal';

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

  constructor(props) {
    super(props);
    this.state = {
      showNotification: false,
      showNativeCurrency: false,
      showExchangeLimit: false,
      showSecurity: false,
      showAbout: true,

      pushNotification: true,
      notifiPhonenumber: true,
      sound: true,

      touchID: false,
      faceID: true,
      securityType: 'touch',
      passcodeVerified: false,
      passcode: '',

      showModalTouchID: false
    }
  }

  _renderRowNotice() {
    return (
      <View>
        {
          this.state.showNotification
            ? (
              <View style={styles.bigRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.nameType}>Notifications</Text>
                  <TouchableOpacity style={styles.notVerified}
                                    onPress={() => this.setState({ showNotification: false })}>
                    <View style={{ marginLeft: scale(28) }}>
                      <Image style={styles.arrowUp}
                             source={require('../../../assets/arrow/arrowUp/Shape.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.normalRow}>
                  <Text style={styles.nameType}>Push notifications</Text>
                  <Switch onTintColor={'#4CD964'}
                          value={this.state.notifiPhonenumber}
                          thumbTintColor={'#ffffff'}
                          onValueChange={
                            () => this.setState((prevState, props) => ({ notifiPhonenumber: !prevState.notifiPhonenumber }))
                          }
                          style={styles.switch}/>
                </View>

                <View style={styles.normalRow}>
                  <Text style={styles.nameType}>+84 0123456789</Text>
                  <Switch onTintColor={'#4CD964'}
                          value={this.state.pushNotification}
                          thumbTintColor={'#ffffff'}
                          onValueChange={
                            () => this.setState((prevState, props) => ({ pushNotification: !prevState.pushNotification }))
                          }
                          style={styles.switch}/>
                </View>

                <View style={styles.normalRow}>
                  <Text style={styles.nameType}>Sound</Text>
                  <Switch onTintColor={'#4CD964'}
                          value={this.state.sound}
                          thumbTintColor={'#ffffff'}
                          onValueChange={
                            () => this.setState((prevState, props) => ({ sound: !prevState.sound }))
                          }
                          style={styles.switch}/>
                </View>
              </View>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>Notifications</Text>
                <TouchableOpacity style={styles.notVerified3}
                                  onPress={() => this.setState({ showNotification: true })}>
                  <Text style={[styles.verifyStatus, { color: '#10AC84' }]}>ON</Text>
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

  _renderRowNativeCurrency() {
    return (
      <View>
        {
          this.state.showNativeCurrency
            ? (
              <View/>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>Native currency</Text>
                <TouchableOpacity style={styles.notVerified3}
                                  onPress={() => this.setState({ showVerifyGoogleAuth: true })}>
                  <Text
                    style={[styles.verifyStatus, { color: '#576574', fontFamily: 'Futura Light Italic font' }]}>USD</Text>
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

  _renderRowExchangeLimit() {
    return (
      <View>
        {
          this.state.showExchangeLimit
            ? (
              <View/>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>Native currency</Text>
                <TouchableOpacity style={styles.notVerified3}
                                  onPress={() => this.setState({ showVerifyGoogleAuth: true })}>
                  <Text style={[styles.verifyStatus, { color: '#576574', fontFamily: 'Futura Light Italic font' }]}>0.04
                    BTC / day</Text>
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

  _renderRowSecurity() {
    return (
      <View>
        {
          this.state.showSecurity
            ? (
              <View style={styles.bigRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.nameType}>Security</Text>
                  <TouchableOpacity style={styles.notVerified}
                                    onPress={() => this.setState({ showSecurity: false })}>
                    <View style={{ marginLeft: scale(28) }}>
                      <Image style={styles.arrowUp}
                             source={require('../../../assets/arrow/arrowUp/Shape.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {this._renderContentRowSecurity()}


              </View>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>Security</Text>
                <TouchableOpacity style={styles.notVerified3}
                                  onPress={() => this.setState({ showSecurity: true })}>
                  <Text style={[styles.verifyStatus, { color: '#D0021B' }]}>OFF</Text>
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

  _renderContentRowSecurity() {
    switch (this.state.securityType) {
      case 'touch':
        return this._renderTouchIdSwitch();
        break;
      case 'face':
        return this._renderFaceIdSwitch();
        break;
      default:
        return this._renderRowPassCode();
    }
  }

  _renderTouchIdSwitch() {
    return (
      <View>
        <View style={styles.normalRow}>
          <Text style={styles.nameType}>Touch ID</Text>
          <Switch onTintColor={'#4CD964'}
                  value={this.state.touchID}
                  thumbTintColor={'#ffffff'}
                  onValueChange={() => this.onToggleTouchID()}
                  style={styles.switch}/>
        </View>

        {this._renderRowPassCode()}
      </View>
    )
  }

  _renderFaceIdSwitch() {
    return (
      <View>
        <View style={styles.normalRow}>
          <Text style={styles.nameType}>Face ID</Text>
          <Switch onTintColor={'#4CD964'}
                  value={this.state.faceID}
                  thumbTintColor={'#ffffff'}
                  onValueChange={
                    () => this.setState((prevState, props) => ({ faceID: !prevState.faceID }))
                  }
                  style={styles.switch}/>
        </View>

        {this._renderRowPassCode()}
      </View>
    )
  }

  _renderRowPassCode(){
    let row;
    this.state.passcodeVerified
      ? row =
        <View style={[styles.normalRow, { marginBottom: scale(10) }]}>
          <Text style={styles.nameType}>Passcode</Text>
          <TouchableOpacity onPress={() => this.setState({ passcodeVerified: false })}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        </View>
      : row =
        <View style={[styles.rowHasBoderBottom, { marginBottom: scale(10), paddingBottom: scale(10) }]}>
          <Text style={styles.nameType}>Passcode</Text>
          <TextInput style={styles.passcodeInput}
                     keyboardType='numeric'
                     underlineColorAndroid='transparent'
                     onChangeText={value => this.setState({ passcode: value })}
          />
          <TouchableOpacity onPress={() => {this.setState({passcodeVerified: true})}}>
            <Text style={[styles.reset, { color: '#10AC84' }]}>OK</Text>
          </TouchableOpacity>
        </View>
    return row
  }

  _renderRowAbout() {
    return (
      <View>
        {
          this.state.showAbout
            ? (
              <View style={styles.bigRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.nameType}>About</Text>
                  <TouchableOpacity style={styles.notVerified}
                                    onPress={() => this.setState({ showAbout: false })}>
                    <View style={{ marginLeft: scale(28) }}>
                      <Image style={styles.arrowUp}
                             source={require('../../../assets/arrow/arrowUp/Shape.png')}
                      />
                    </View>

                  </TouchableOpacity>
                  <Text style={styles.version}>v1.0</Text>
                </View>

                <View style={styles.normalRow}>
                  <Text style={styles.nameType}>Email</Text>
                  <Text style={[styles.reset, {color: '#2E86DE'}]}>info@sotatek.com</Text>
                </View>

                <View style={styles.normalRow}>
                  <Text style={styles.nameType}>Phone</Text>
                  <Text style={[styles.reset, {color: '#2E86DE'}]}>+84 0987654321</Text>
                </View>

                <Text style={styles.copyRight}>Copyright by ©Sota Tek, JSC. 2018</Text>

              </View>
            )
            : (
              <View style={styles.row}>
                <Text style={styles.nameType}>About</Text>
                <TouchableOpacity style={styles.notVerified3}
                                  onPress={() => this.setState({ showAbout: true })}>
                  <Text style={[styles.verifyStatus, {
                    color: '#576574',
                    fontFamily: 'Futura Light Italic font'
                  }]}>v1.0</Text>
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

  _renderModalTouchId() {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={this.state.showModalTouchID}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='#000000'
        onBackButtonPress={() => this.setState({ showModalTouchID: false })}
        style={styles.modalTouchID}
      >
        <Image style={styles.iconFingerPrint}
               source={require('../../../assets/fingerPrint/Icon.png')}/>
        <Text style={styles.textInModal1}>Enable Touch ID</Text>
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => this.setState({ showModalTouchID: false })}>
          <Text style={styles.textInModal2}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  onToggleTouchID() {
    this.state.touchID
      ? this.setState((prevState, props) => ({ touchID: !prevState.touchID }))
      : this.setState((prevState, props) => ({ touchID: !prevState.touchID, showModalTouchID: true }))
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Setting</Text>
          <TouchableOpacity style={styles.iconBackContainer} onPress = {() => disMissSetting()}>
            <Image style={styles.iconBack}
                   source={require('../../../assets/back/backColor.png')}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingRight: scale(30), paddingLeft: scale(30), marginTop: scale(20) }}>
          {this._renderRowNotice()}
          {this._renderRowNativeCurrency()}
          {this._renderRowExchangeLimit()}
          {this._renderRowSecurity()}
          {this._renderRowAbout()}
          {this._renderModalTouchId()}
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
    fontFamily: 'Futura Medium font', color: '#576574', fontSize: '17@s', fontWeight: 'bold', textAlign: 'center',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', height: '60@s',
  },
  iconBack: {
    width: '12@s', height: '20@s'
  },
  iconBackContainer: {
    position: 'absolute', left: '20@s'
  },
  row: {
    marginBottom: '20@s', height: '56@s', backgroundColor: '#ffffff', flexDirection: 'row', borderRadius: '28@s',
    alignItems: 'center', paddingLeft: '20@s', paddingRight: '28@s', justifyContent: 'space-between'
  },
  nameType: {
    fontFamily: 'Futura Book font', fontSize: '13@s', color: '#576574', flex: 1,
  },
  verifyStatus: {
    fontFamily: 'Futura Book font', fontSize: '13@s', lineHeight: '15@s', textAlign: 'right', flex: 4
  },
  notVerified3: {
    flex: 1, flexDirection: 'row', alignItems: 'center'
  },
  arrowDown: {
    width: '10@s', height: '6@s',
  },
  bigRow: {
    marginBottom: '20@s', backgroundColor: '#ffffff', borderRadius: '28@s',
  },
  titleRow: {
    flexDirection: 'row', height: '36.5@s', alignItems: 'center', paddingLeft: '20@s', paddingRight: '28@s',
    borderBottomColor: '#E0E0E0', borderBottomWidth: '1@s'
  },
  arrowUp: {
    width: '10@s', height: '6@s',
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
  },
  normalRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingLeft: '20@s', paddingRight: '20@s', marginTop: '5@s', marginBottom: '7@s'
  },
    reset: {
    fontFamily: 'Futura Medium font', fontSize: '13@s', color: '#D0021B'
  },
  rowHasBoderBottom: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginLeft: '20@s', marginRight: '20@s', marginBottom: '7@s',
    borderBottomWidth: '1@s', borderBottomColor: '#E0E0E0',
  },
  passcodeInput: {
    flex: 2, paddingRight: '16@s', textAlign: 'right', height: '27@s', paddingBottom: '6@s',
    fontFamily: 'Futura Book font', fontSize: '13@s', color: '#576574',
  },
  modalTouchID: {
    flexDirection: 'column', alignItems: 'center'
  },
  iconFingerPrint: {
    width: '64@s', height: '64@s'
  },
  textInModal1: {
    fontFamily: 'Futura Book font', fontSize: '18@s', color: 'rgba(255, 255, 255, 0.7)', marginTop: '20@s'
  },
  textInModal2: {
    fontFamily: 'Futura Book font', fontSize: '16@s', color: '#ffffff',
  },
  cancelContainer: {
    position: 'absolute', bottom: '25@s'
  },
  copyRight: {
    fontFamily: 'Futura Light font', fontSize: '14@s', color: '#576574', textAlign: 'center', marginBottom: '16@s',
    marginTop: '20@s'
  },
  version: {
    fontSize: '13@s', color: '#576574', fontFamily: 'Futura Light Italic font', position: 'absolute', right: '68@s'
  }
})