import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Clipboard, Slider } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';

export default class OtpScreen extends PureComponent {
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
      showSendCoin: false,
      showNewWallet: false,
      showMain2: false,
      showListCoin: false,
      value: 10
    }
  }

  _renderSenCoin(){
    return(
      <View>
        {
          this.state.showSendCoin
            ? (
              <View style={[styles.bigRow, {paddingLeft: 0}]}>
                <View style={[styles.titleRow, {marginLeft: scale(20)}]}>
                  <Text style={styles.nameType}>Main</Text>
                  <Text style={styles.numberCoin}>1.25 BTC</Text>
                </View>

                <View style={[styles.rowInput, {marginLeft: scale(20)}]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Secret code</Text>
                  <View style={{ flex: 2.1 }}>
                    <TextInput style={styles.phoneInput}
                               underlineColorAndroid='transparent'
                               secureTextEntry={true}
                               keyboardType='numeric'
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                </View>

                <View style={[styles.rowInput, {marginLeft: scale(20)}]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Destination Address</Text>
                  <View style={{ flex: 1.3 }}>
                    <TextInput style={styles.phoneInput}
                               underlineColorAndroid='transparent'
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                  <TouchableOpacity
                    onPressIn={() => this.setState({ showRepeatPassWord: true })}
                    onPressOut={() => this.setState({ showRepeatPassWord: false })}>
                    <Image style={styles.qrIcon}
                           source={require('../../../assets/qrCode/qr-code.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={[styles.rowInput, {marginLeft: scale(20)}]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Amount</Text>
                  <View style={{ flex: 3 }}>
                    <TextInput style={styles.phoneInput}
                               underlineColorAndroid='transparent'
                               keyboardType='numeric'
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                </View>

                <View style={[styles.rowInput, {marginLeft: scale(20)}]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Fee</Text>
                  <View style={{ flex: 1.5 }}>
                    <Text style={[styles.secretCode, { textAlign: 'right', paddingRight: scale(10) }]}>0.00007
                      BTC</Text>
                  </View>
                </View>

                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    // step={5}
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.value}
                    onValueChange={val => this.setState({ value: val })}
                    onSlidingComplete={ val => this.setState({ value: val })}
                    minimumTrackTintColor = {'#838B94'}
                    thumbTintColor = {'#576574'}
                    maximumTrackTintColor = {'#838B94'}
                  />
                </View>

                <View style={[styles.groupMpdalPhoneText, { justifyContent: 'center' }]}>
                  <TouchableOpacity style={{ marginRight: scale(15) }}
                                    onPress={() => this.setState({ showSendCoin: false })}>
                    <Text style={styles.buttonCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: scale(15) }}>
                    <Text style={styles.buttonOK}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>

            )
            : (
              <View style={styles.row1}>
                <Text style={styles.nameType}>Main</Text>
                <Text style={styles.numberCoin}>1.25 BTC</Text>
                <TouchableOpacity onPress={() => this.setState({ showSendCoin: true })}>
                  <Text style={styles.buttonSend}>SEND</Text>
                </TouchableOpacity>
              </View>
            )
        }
      </View>
    )
  }

  _renderMain2(){
    return(
      <View>
        {
          this.state.showMain2
            ? (
              <View style={[styles.bigRow, { paddingLeft: 0 }]}>
                <View style={styles.row2}>
                  <Text style={styles.nameType}>Main 2</Text>
                  <Text style={styles.numberCoin}>0 BTC</Text>
                  <TouchableOpacity style={{ flex: 0.2, flexDirection: 'row-reverse' }}
                                    onPress={() => this.setState({ showMain2: false })}>
                    <Image style={styles.arrowRight}
                           source={require('../../../assets/arrow/arrowUp/Shape.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={styles.privateKeyContainer}>
                  <Text style={styles.textPrivateKey}>Private key</Text>
                  <View style={{ flexDirection: 'row', height: scale(40), alignItems: 'center' }}>
                    <Text style={styles.privateKey}>a7cd5fd7dcb3ed17183f786effaa21413234123b</Text>
                    <TouchableOpacity onPress={() => Clipboard.setString('a7cd5fd7dcb3ed17183f786effaa21413234123b')}>
                      <Text style={styles.textCopy}>COPY</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.privateKeyContainer}>
                  <Text style={styles.textPrivateKey}>Address</Text>
                  <Text style={[styles.privateKey, { width: scale(275) }]}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</Text>
                  <View style={styles.qrCodeContainer}>
                    <Image style={styles.qrCode}
                           source={require('../../../assets/qrCode/frame.png')} />
                  </View>
                </View>

                <View style={[styles.groupMpdalPhoneText, { justifyContent: 'center' }]}>
                  <TouchableOpacity style={{ marginLeft: scale(15) }}>
                    <Text style={styles.buttonOK}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
            : (
              <View style={styles.row1}>
                <Text style={styles.nameType}>Main 2</Text>
                <Text style={styles.numberCoin}>0 BTC</Text>
                <TouchableOpacity style={{ flex: 0.2, flexDirection: 'row-reverse' }}
                                  onPress={() => this.setState({ showMain2: true })}>
                  <Image style={styles.arrowDown}
                         source={require('../../../assets/arrow/arrowDown/Shape.png')}
                  />
                </TouchableOpacity>
              </View>
            )
        }
      </View>
    )
  }

  _renderAddNewWallet(){
    return(
      <View>
        {
          this.state.showNewWallet
            ? (
              <View style={[styles.bigRow, { paddingLeft: 0 }]}>
                <View style={styles.row2}>
                  <Text style={styles.nameType}>New wallet</Text>
                  <TouchableOpacity style={{ flex: 0.2, flexDirection: 'row-reverse' }}
                                    onPress={() => this.setState({ showNewWallet: false })}>
                    <Image style={styles.arrowRight}
                           source={require('../../../assets/arrow/arrowUp/Shape.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View style={[styles.rowInput, {marginLeft: scale(20)}]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Secret code</Text>
                  <View style={{ flex: 2.1 }}>
                    <TextInput style={styles.phoneInput}
                               underlineColorAndroid='transparent'
                               secureTextEntry={true}
                               keyboardType='numeric'
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                </View>

                <View style={{ width: scale(275) }}>
                  <Text style={styles.notice}>Remember: Back up this secret code.</Text>
                </View>

                <View style={[styles.rowInput, {marginLeft: scale(20)}]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Name</Text>
                  <View style={{ flex: 3 }}>
                    <TextInput style={styles.phoneInput}
                               underlineColorAndroid='transparent'
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                </View>

                <View style={[styles.groupMpdalPhoneText, { justifyContent: 'center' }]}>
                  <TouchableOpacity style={{ marginLeft: scale(15) }}>
                    <Text style={styles.buttonOK}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
            : (
              <View style={styles.row1}>
                <Text style={styles.nameType}>New wallet</Text>
                <TouchableOpacity style={{ flex: 0.2, flexDirection: 'row-reverse' }}
                                  onPress={() => this.setState({ showNewWallet: true })}>
                  <Image style={styles.arrowDown}
                         source={require('../../../assets/arrow/arrowDown/Shape.png')}
                  />
                </TouchableOpacity>
              </View>
            )
        }
      </View>
    )
  }

  _renderListCoin(){
    return (
      <Modal
        isVisible={this.state.showListCoin}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='transparent'
        onBackButtonPress={this.setState({showListCoin: false})}
        onBackdropPress={this.setState({showListCoin: false}))}>
        <Card>
        </Card>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.containerUp}>
          <View style={styles.colUpContainer}>
            <Text style={styles.textTotalBalance}>TOTAL BALANCE</Text>
            <Text style={styles.textUnderTotal}>1.25 BTC</Text>
            <Text>7,500 USD</Text>
          </View>
          <TouchableOpacity style={[styles.colUpContainer, { flex: 1 }]}>
            <Text style={styles.textHistory}>HISTORY</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.buttonSelectCoin}>
          <Text style={styles.coinName}>BTC</Text>
          <Image style={styles.arrowInButton}
                 source={require('../../../assets/arrow/arrowDown/white.png')}
          />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.containerDown}>
            {this._renderSenCoin()}
            {this._renderMain2()}
            {this._renderAddNewWallet()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  containerUp: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '75@s',
    marginBottom: '35@s'
  },
  containerDown: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '30@s',
    paddingRight: '30@s'
  },
  colUpContainer: {
    flex: 3.5,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '17@s',
    paddingRight: '10@s'
  },
  textTotalBalance: {
    fontFamily: 'Futura Book font',
    color: '#576574',
    fontSize: '14@s'
  },
  textUnderTotal: {
    fontSize: '13@s',
    fontFamily: 'Futura Book font',
    color: '#576574'
  },
  textHistory: {
    fontSize: '14@s',
    textAlign: 'right',
    fontFamily: 'Futura Heavy font',
    color: '#576574'
  },
  buttonSelectCoin: {
    position: 'absolute',
    top: '60@s',
    width: '100@s',
    height: '30@s',
    borderRadius: '15@s',
    backgroundColor: '#576574',
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinName: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#ffffff'
  },
  arrowInButton: {
    position: 'absolute',
    width: '9@s',
    height: '5@s',
    right: '12@s'
  },
  row1: {
    marginBottom: '10@s',
    height: '56@s',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: '28@s',
    alignItems: 'center',
    paddingLeft: '20@s',
    paddingRight: '28@s',
    justifyContent: 'space-between',
    width: '315@s'
  },
  nameType: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574',
    flex: 1,
  },
  numberCoin: {
    position: 'absolute',
    right: '85@s',
    fontSize: '13@s',
    fontFamily: 'Futura Book font',
    color: '#576574'
  },
  buttonSend: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    lineHeight: '15@s',
    textAlign: 'right',
    color: '#10AC84'
  },
  bigRow: {
    marginBottom: '10@s',
    backgroundColor: '#ffffff',
    borderRadius: '28@s',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '20@s',
    width: '315@s'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s'
  },
  rowInput: {
    flexDirection: 'row',
    marginRight: '20@s',
    height: '40@s', borderBottomWidth: '1@s', borderBottomColor: '#E0E0E0', alignItems: 'center'
  },
  secretCode: {
    fontFamily: 'Futura Book font',
    fontSize: '12@s',
    color: '#576574'
  },
  phoneInput: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574',
    height: '40@s',
    paddingBottom: '9@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
    textAlign: 'right'
  },
  qrIcon: {
    width: 21,
    height: 20
  },
  sliderContainer:{
    flexDirection: 'column',
    height: '25@s',
    alignItems: 'center',
    marginLeft: '2@s'
  },
  slider: {
    marginTop: '10@s',
    borderRadius: '2@s',
    width: '305@s'
  },
  buttonCircle: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    backgroundColor: '#576574',
    position: 'absolute',
    left: '166@s',
  },
  groupMpdalPhoneText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '30@s',
    height: '40@s'
  },
  buttonCancel: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574'
  },
  buttonOK: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#10AC84',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '20@s',
    paddingRight: '28@s',
    justifyContent: 'space-between',
    height: '55@s',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s'
  },
  arrowDown: {
    width: '10@s',
    height: '6@s'
  },
  notice: {
    color: '#F86C6B',
    fontFamily: 'Futura Book font',
    fontSize: '11@s',
    textAlign: 'left'
  },
  privateKeyContainer: {
    marginTop: '8@s'
  },
  textPrivateKey: {
    color: '#576574',
    fontWeight: 'bold',
    fontFamily: 'Futura Book font',
    fontSize: '13@s'
  },
  privateKey: {
    fontFamily: 'Futura Light font',
    fontSize: '13@s',
    color: '#576574',
    paddingLeft: '20@s',
    paddingRight: '20@s',
    width: '240@s',
    textAlign: 'center'
  },
  textCopy: {
    color: '#2E86DE',
    fontFamily: 'Futura Book font',
    fontSize: '13@s'
  },
  qrCodeContainer: {
    marginTop: '20@s',
    marginBottom: '5@s',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
  },
  qrCode: {
    width: '155@s',
    height: '155@s'
  }
});
