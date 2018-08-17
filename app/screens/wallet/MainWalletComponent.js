import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Slider } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";

export default class MainWalletComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSendCoin: false,
    };

  }

  render() {
    return(
      <View>
        {
          this.state.showSendCoin
            ? (
              <View style={[styles.bigRow, { paddingLeft: 0 }]}>
                <View style={[styles.titleRow, { marginLeft: scale(20) }]}>
                  <Text style={styles.nameType}>{this.props.name}</Text>
                  <Text style={styles.numberCoin}>1.25 BTC</Text>
                </View>

                <View style={[styles.rowInput, { marginLeft: scale(20) }]}>
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

                <View style={[styles.rowInput, { marginLeft: scale(20) }]}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Destination Address</Text>
                  <View style={{ flex: 1.3 }}>
                    <TextInput style={styles.phoneInput}
                               underlineColorAndroid='transparent'
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
                  <TouchableOpacity>
                    <Image style={styles.qrIcon}
                           source={require('../../../assets/qrCode/qr-code.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={[styles.rowInput, { marginLeft: scale(20) }]}>
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

                <View style={[styles.rowInput, { marginLeft: scale(20) }]}>
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
                    onSlidingComplete={val => this.setState({ value: val })}
                    minimumTrackTintColor={'#838B94'}
                    thumbTintColor={'#576574'}
                    maximumTrackTintColor={'#838B94'}
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
                <Text style={styles.nameType}>{this.props.name}</Text>
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
}

const styles = ScaledSheet.create({
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
  qrIcon: {
    width: 21,
    height: 20
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
    height: '37@s', borderBottomWidth: '1@s', borderBottomColor: '#E0E0E0', alignItems: 'center'
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
  sliderContainer: {
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
  groupMpdalPhoneText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '30@s',
    height: '35@s'
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
});
