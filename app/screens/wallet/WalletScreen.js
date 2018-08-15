import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";

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
    }
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
          <TouchableOpacity style={[styles.colUpContainer, {flex: 1}]}>
            <Text style={styles.textHistory}>HISTORY</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.buttonSelectCoin}>
          <Text style={styles.coinName}>BTC</Text>
          <Image style={styles.arrowInButton}
                 source={require('../../../assets/arrow/arrowDown/white.png')}
          />
        </TouchableOpacity>

        <View style={styles.containerDown}>
          {
            this.state.showSendCoin
              ? (
              <View style={styles.bigRow}>
                <View style={styles.titleRow}>
                  <Text style={styles.nameType}>Main</Text>
                  <Text style={styles.numberCoin}>1.25 BTC</Text>
                </View>
                <View style={styles.rowInput}>
                  <Text style={[styles.secretCode, { flex: 1 }]}>Secret code</Text>
                  <View style={{ flex: 1.5 }}>
                    <TextInput style={[styles.phoneInput, { height: scale(40) }]}
                               underlineColorAndroid='transparent'
                               secureTextEntry={!this.state.showCurrentPassword}
                      // value={password}
                      // onChangeText={(p) => this._changePassword(p)}
                    />
                  </View>
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
  },
  containerDown: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '35@s',
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
    marginBottom: '20@s',
    backgroundColor: '#ffffff',
    borderRadius: '28@s',
    height: '56@s',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '20@s',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s'
  },
  rowInput:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: '20@s',
    marginRight: '20@s'
  },
  secretCode:{
    fontFamily: 'Futura Book font',
    fontSize: '12@s',
    color: '#576574',
  }
});
