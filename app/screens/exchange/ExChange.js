import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Modal from 'react-native-modal';
import ModalDropdown from '../../libs/reactModalDropdown/ModalDropdown';

class ExChange extends Component {
  state = {
    listCoin: [
      {
        id: 0,
        name: 'BTC',
        img: require('../../../assets/coinIcon/btc/bit.png')
      },
      {
        id: 1,
        name: 'ABC',
        img: require('../../../assets/coinIcon/abc/abc.png')
      },
      {
        id: 2,
        name: 'ETH',
        img: require('../../../assets/coinIcon/eth/eth.png')
      }
    ],
    selectedCoin: {
      name: 'BTC',
      img: require('../../../assets/coinIcon/btc/bit.png')
    },
    addressWallet: [
      {
        id: 0,
        code: 'Main - 1F1tAaz5x1HUXrCNLbtMDqcw6o5GN...'
      },
      {
        id: 1,
        code: 'Main - 2A1LAaz5x1HUXrCNLbtMDqcw6o5GN...'
      },
      {
        id: 2,
        code: 'Main - 3B1tAaz5x1HUXrCNLbtMDqcw6o5GN...'
      },
    ],
    isShowListCoin: false,
    isShowSecretCode: true,
  };

  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },
    };
  }

  _showModalSelectCoin() {
    this.setState({ isShowListCoin: true });
  }

  _hideModalListCoin() {
    this.setState({ isShowListCoin: false })
  }

  _selectedCoin(selectedCoin) {
    this.setState({ selectedCoin, isShowListCoin: false });
  }

  _toggleSecretCode() {
    const { isShowSecretCode } = this.state;

    this.setState({ isShowSecretCode: !isShowSecretCode });
  }

  _renderListCoin() {
    const { listCoin, isShowListCoin, selectedCoin } = this.state;
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={isShowListCoin}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='transparent'
        onBackButtonPress={() => this._hideModalListCoin()}
        onBackdropPress={() => this._hideModalListCoin()}
        style={styles.modalListCoin}
      >
        <View style={{ flexDirection: 'column' }}>
          {listCoin.map(coin => <TouchableOpacity onPress={() => this._selectedCoin(coin)} key={coin.id}>
              <View style={selectedCoin.name === coin.name ? styles.currentCoin : styles.itemCoin}>
                <Image source={coin.img} style={styles.imgBitcoin}/>
                <Text>{coin.name}</Text>
                <Image source={require('../../../assets/arrow/arrowDown/Shape.png')} style={styles.imgArrowDown}/>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    )
  }

  _renderCoinSeleted(item) {
    return (
      <TouchableOpacity onPress={() => this._showModalSelectCoin()}>
        <View style={styles.coinSelected}>
          <Image source={item.img} style={styles.imgBitcoin}/>
          <Text>{item.name}</Text>
          <Image source={require('../../../assets/arrow/arrowDown/Shape.png')} style={styles.imgArrowDown}/>
        </View>
      </TouchableOpacity>
    )
  }


  _renderAddress() {
    return (
      <View style={styles.addressContainer}>
        <Text style={styles.titleAddress}>To Address</Text>
        <View style={styles.contentAddress}>
          <Text style={styles.addressCode}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</Text>
          <Image source={require('../../../assets/imgFolder/folder.png')} style={styles.imgFolder}/>
        </View>
      </View>
    )
  }

  _renderSelectFromWallet() {
    const { addressWallet } = this.state;

    return (
      <ModalDropdown
        options={[addressWallet[0].code, addressWallet[1].code]}
        style={styles.dropdownContainer}
        textStyle={styles.valueDropdown}
        viewButton={styles.buttonSelectDropdown}
        defaultValue={'Select from wallets'}
        animated={true}
        dropdownStyle={styles.viewDropDown}
        dropdownTextStyle={styles.dropDownTextStyle}
        showsVerticalScrollIndicator={false}
        dropdownTextHighlightStyle={styles.dropDownTextHighlightStyle}
        onSelect={(rowID) => {
        }}
      />
    )
  }

  _renderSecretCode() {
    const { isShowSecretCode } = this.state;

    return (
      <View style={styles.secretCodeContainer}>
        <Text style={styles.titleSecretCode}>Secret code</Text>
        <TextInput style={styles.inputSecretCode} secureTextEntry={isShowSecretCode}/>
        <TouchableWithoutFeedback onPress={() => this._toggleSecretCode()}>
          <View>
            {
              isShowSecretCode ? <Image source={require('../../../assets/eye/view.png')} style={styles.imgEye}/> :
                <Image source={require('../../../assets/eye/view.png')} style={styles.imgEye}/>
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  _renderYourCoinReceive() {
    return(
      <View style={styles.receiveContainer}>
        <Text style={styles.titleYourReceive}>You will receive</Text>
        <View style={styles.inforCoinReceive}>
          <Text style={styles.valueCoinReceive}>0.0</Text>
          <View style={styles.contentCoinReceive}>
            <Image source={require('../../../assets/coinIcon/abc/abc.png')} style={styles.imgCoinRecevie}/>
            <Text style={styles.coinReceive}>ABC</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderYourAddress() {
    return(
      <View style={styles.yourAddressContainer}>
        <Text style={styles.titleYourAddress}>In your ETH Address</Text>
        <Text style={styles.contentYourAddress}>0x278EDfD9bF4c3cab1Ac4951B0094F82424771
          B6E</Text>
      </View>
    )
  }

  _renderSubmit() {
    return(
      <TouchableOpacity style={styles.submitContainer}>
        <View>
          <Text style={styles.textSubmit}>SUBMIT</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { selectedCoin } = this.state;

    return (
      <View style={styles.screen}>
        <View style={styles.selectCoinContainer}>
          <View style={styles.sendContainer}>
            <Text style={styles.textSend}>Send</Text>
            <TextInput style={styles.textInputSend} value={'0.0'}/>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {this._renderCoinSeleted(selectedCoin)}
          </View>
        </View>

        {this._renderAddress()}

        <View style={styles.viewImageQrCode}>
          <Image source={require('../../../assets/qrCode/frame.png')} style={styles.imgQrcode}/>
        </View>

        {this._renderListCoin()}
        {this._renderSelectFromWallet()}
        {this._renderSecretCode()}
        {this._renderYourCoinReceive()}
        {this._renderYourAddress()}
        {this._renderSubmit()}
      </View>
    )
  }
}

export default ExChange;

const styles = ScaledSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  },
  selectCoinContainer: {
    flexDirection: 'row',
    marginTop: '30@s',
  },
  sendContainer: {
    flexDirection: 'column',
    marginLeft: '48@s',
    flex: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
    marginRight: '40@s'
  },
  textSend: {
    color: '#D0021B',
    fontSize: '13@s',
    textAlign: 'left',
    fontFamily: 'Futura Light Regular'
  },
  textInputSend: {
    fontSize: '20@s',
    color: '#B8BEC6',
    fontFamily: 'Futura Light Regular'
  },
  imgBitcoin: {
    width: '31@s',
    height: '31@s',
    marginRight: '10@s'
  },
  imgArrowDown: {
    width: '10@s',
    height: '6@s',
    marginLeft: '10@s'
  },
  coinSelected: {
    flexDirection: 'row',
    marginTop: '5@s',
    height: '62@s',
    width: '107@s',
    borderWidth: '1@s',
    borderColor: '#E0E0E0',
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemCoin: {
    flexDirection: 'row',
    marginTop: '5@s',
    height: '62@s',
    width: '107@s',
    borderWidth: '1@s',
    borderColor: '#E0E0E0',
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalListCoin: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: '50@s',
    marginRight: '17@s'
  },
  currentCoin: {
    flexDirection: 'row',
    marginTop: '5@s',
    height: '62@s',
    width: '107@s',
    borderWidth: '1@s',
    borderColor: '#E0E0E0',
    borderRadius: '8@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0'
  },
  addressContainer: {
    marginLeft: '48@s',
    marginTop: '10@s'
  },
  imgFolder: {
    width: '17@s',
    height: '20@s',
    marginLeft: '25@s'
  },
  titleAddress: {
    fontSize: '13@s',
    color: '#576574',
    fontFamily: 'Futura',
  },
  contentAddress: {
    marginTop: '4@s',
    flexDirection: 'row'
  },
  addressCode: {
    fontSize: '13@s',
    textAlign: 'center',
    fontFamily: 'Futura Light Regular',
  },
  viewImageQrCode: {
    alignItems: 'center',
    marginTop: '15@s'
  },
  imgQrcode: {
    width: '80@s',
    height: '80@s',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: '48@s',
    marginTop: '15@s',
  },
  buttonSelectDropdown: {
    flexDirection: 'row',
    paddingBottom: '13.5@s',
    width: '275@s',
    justifyContent: 'space-between',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s'
  },
  viewDropDown: {
    width: '275@s',
  },
  valueDropdown: {
    fontSize: '12@s',
    marginTop: '3@s',
    color: '#576574',
    fontFamily: 'Futura Light Regular'
  },
  secretCodeContainer: {
    flexDirection: 'row',
    marginLeft: '48@s',
    width: '275@s',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSecretCode: {
    fontSize: '12@s',
    color: '#576574',
    fontFamily: 'Futura Light Regular',
  },
  inputSecretCode: {
    textAlign: 'left',
    width: '200@s'
  },
  imgEye: {
    width: '18@s',
    height: '11@s',
  },
  receiveContainer: {
    flexDirection: 'column',
    marginLeft: '48@s',
    marginTop: '15.5@s',
  },
  titleYourReceive: {
    color: '#10AC84',
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    marginBottom: '8@s'
  },
  inforCoinReceive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: '1@s',
    borderBottomColor: '#E0E0E0',
    paddingBottom: '11@s',
    marginRight: '52@s'
  },
  valueCoinReceive: {
    color: '#B8BEC6',
    fontSize: '20@s',
    fontFamily: 'Futura Light Regular',
    textAlign: 'left'
  },
  contentCoinReceive: {
    flexDirection: 'row',
  },
  imgCoinRecevie: {
    width: '20@s',
    height: '20@s',
  },
  coinReceive: {
    color: '#576574',
    fontSize: '14@s',
    fontFamily: 'Futura Light Regular',
    marginLeft: '12@s'
  },
  yourAddressContainer: {
    flexDirection: 'column',
    marginTop: '10@s',
    marginLeft: '48@s',
    marginRight: '38@s',
  },
  titleYourAddress: {
    color: '#576574',
    fontSize: '13@s',
    fontFamily: 'Futura',
    textAlign: 'left',
    marginBottom: '4@s'
  },
  contentYourAddress: {
    textAlign: 'center',
    lineHeight: '15@s',
    fontSize: '13@s',
    color: '#576574',
    fontFamily: 'Futura Light Regular',
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50@s'
  },
  textSubmit: {
    fontSize: '16@s',
    color: '#B8BEC6',
    fontFamily: 'Futura Light Regular',
  }
});
