import React, { PureComponent } from 'react';
import { View, Text, Image, Clipboard, TextInput, TouchableOpacity } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import MainWalletComponent from "./MainWalletComponent";
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';

export default class WalletInfor extends PureComponent {
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
      showModalHistory: false,
      showModalExportPrivateKey: false,
      showModalPrivateKey: false,
      showModalDeleteWallet: false,
    };
  }

  _renderModalHistory() {
    let modalHistory;
    this.state.showModalHistory
      ? (
        modalHistory =
          <Card containerStyle={[styles.cardHistoryContainer, {height: scale(240)}]}>
            <View>
              <View style={styles.titleRow}>
                <Text style={styles.textHisTrans}>History transaction</Text>
                <TouchableOpacity style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end' }}
                                  onPress={() => this.setState({ showModalHistory: false })}>
                  <Image style={styles.arrowDown}
                         source={require('../../../assets/arrow/arrowUp/Shape.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={[styles.titleTable, { flex: 2, textAlign: 'center' }]}>Time</Text>
                  <Text style={[styles.titleTable, { flex: 5, textAlign: 'right' }]}>TXID</Text>
                  <Text style={[styles.titleTable, { flex: 3, textAlign: 'right' }]}>Amount</Text>
                </View>

                <View style={[styles.row, { marginBottom: scale(6) }]}>
                  <Text style={[styles.contentTimeTable, { flex: 2, textAlign: 'center' }]}>10:00 01/12/18</Text>
                  <Text style={[styles.contentInOut, { flex: 2, textAlign: 'center', color: '#10AC84' }]}>IN</Text>
                  <Text style={[styles.address, { flex: 3, textAlign: 'right' }]} numberOfLines={1}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</Text>
                  <Text style={[styles.contentTimeTable, { flex: 3, textAlign: 'right' }]}>1.5 BTC</Text>
                </View>

                <View style={styles.row}>
                  <Text style={[styles.contentTimeTable, { flex: 2, textAlign: 'center' }]}>12:00 01/12/18</Text>
                  <Text style={[styles.contentInOut, { flex: 2, textAlign: 'center', color: '#D0021B' }]}>OUT</Text>
                  <Text style={[styles.address, { flex: 3, textAlign: 'right' }]} numberOfLines={1}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</Text>
                  <Text style={[styles.contentTimeTable, { flex: 3, textAlign: 'right' }]}>0.25 BTC</Text>
                </View>
              </View>

            </View>
          </Card>
      )
      : (
        modalHistory =
          <Card containerStyle={styles.cardHistoryContainer}>
            <View style={styles.historyTransactionContainer}>
              <Text style={styles.textHisTrans}>History transaction</Text>
              <TouchableOpacity style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end' }}
                                onPress={() => this.setState({ showModalHistory: true })}>
                <Image style={styles.arrowDown}
                       source={require('../../../assets/arrow/arrowDown/Shape.png')}/>
              </TouchableOpacity>
            </View>
          </Card>
      );
    return (
      modalHistory
    )
  }

  _renderModalExportprivateKey() {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={this.state.showModalExportPrivateKey}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='#000000'
        onBackButtonPress={() => this.hideModal()}
        onBackdropPress={() => this.hideModal()}
        onRequestClose={() => this.hideModal()}
        style={styles.modalDropdown}
        backdropOpacity={0.3}
      >
        <View style={styles.modalExportPrivateKey}>
          <Text style={styles.titleModal}>Export private key</Text>

          <View style={[styles.rowInput, { marginLeft: scale(20) }]}>
            <Text style={[styles.secretCode, { flex: 1 }]}>Secret code</Text>
            <View style={{ flex: 3 }}>
              <TextInput style={styles.phoneInput}
                         underlineColorAndroid='transparent'
                         keyboardType='numeric'
                // value={password}
                // onChangeText={(p) => this._changePassword(p)}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => this.checkSecretCode()}>
            <Text style={[styles.contentTimeTable, { color: '#10AC84', textAlign: 'center' }]}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  _renderModalPrivateKey() {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={this.state.showModalPrivateKey}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='#000000'
        onBackButtonPress={() => this.hideModal()}
        onBackdropPress={() => this.hideModal()}
        onRequestClose={() => this.hideModal()}
        style={styles.modalDropdown}
        backdropOpacity={0.3}
      >
        <View style={[styles.modalExportPrivateKey, { alignItems: 'center' }]}>
          <View style={[styles.rowInput2, { width: scale(280) }]}>
            <Text style={styles.titleModal}>Private key</Text>
          </View>

          <Text style={[styles.address, { marginLeft: scale(60), marginRight: scale(60) }]}>7cd5fd7dcb3ed17183f786effaa21413234123b</Text>

          <View style={styles.groupButton}>
            <TouchableOpacity onPress={() => Clipboard.setString('7cd5fd7dcb3ed17183f786effaa21413234123b')}>
              <Text style={styles.buttonSms}>COPY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showModalPrivateKey: false })}>
              <Text style={[styles.contentTimeTable, { color: '#10AC84', textAlign: 'center' }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  _renderModalDeleteWallet() {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={this.state.showModalDeleteWallet}
        avoidKeyboard={true}
        useNativeDriver={true}
        backdropColor='#000000'
        onBackButtonPress={() => this.hideModal()}
        onBackdropPress={() => this.hideModal()}
        onRequestClose={() => this.hideModal()}
        style={styles.modalDropdown}
        backdropOpacity={0.3}
      >
        <View style={[styles.modalExportPrivateKey, { alignItems: 'center' }]}>
          <View style={[styles.rowInput2, { width: scale(280) }]}>
            <Text style={styles.titleModal}>Delete wallet</Text>
          </View>

          <Text style={[styles.contentTimeTable]}>
            Do you really want to delete this wallet?
          </Text>

          <View style={styles.groupButton}>
            <TouchableOpacity onPress={() => this.hideModal()}>
              <Text style={styles.buttonCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onDeleteWallet()}>
              <Text style={[styles.contentTimeTable, { color: '#10AC84', textAlign: 'center' }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  hideModal() {
    this.setState({
      showModalExportPrivateKey: false,
      showModalPrivateKey: false,
      showModalDeleteWallet: false,
    })
  }

  checkSecretCode() {
    this.setState({
      showModalExportPrivateKey: false,
      showModalPrivateKey: true
    })
  }

  onDeleteWallet() {
    this.hideModal()
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.topContainer}>
          <Image source={require('../../../assets/back/backColor.png')}
                 style={styles.imgBack}/>
          <TouchableOpacity style={styles.buttonDelContainer}
                            onPress={() => {
                              this.setState({ showModalDeleteWallet: true })
                            }}>
            <Text style={styles.textButtonDel}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.qrContainer}>
          <Image style={styles.qrCode} source={require('../../../assets/qrCode/frame.png')}/>
          <Text style={[styles.address, { marginLeft: scale(100), marginRight: scale(100) }]}>
            1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX
          </Text>

          <View style={styles.groupMpdalPhoneText}>
            <TouchableOpacity onPress={() => Clipboard.setString('1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX')}>
              <Text style={styles.buttonSms}>COPY ADDRESS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showModalExportPrivateKey: true })}>
              <Text style={[styles.buttonSms, { color: '#D0021B' }]}>EXPORT PRIVATE KEY</Text>
            </TouchableOpacity>
          </View>

          <MainWalletComponent name='Amount'/>
        </View>

        {this._renderModalHistory()}
        {this._renderModalExportprivateKey()}
        {this._renderModalPrivateKey()}
        {this._renderModalDeleteWallet()}

      </View>
    )
  }
}

const styles = ScaledSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30@s'
  },
  buttonDelContainer: {
    paddingTop: '10@s',
    paddingRight: '21@s'
  },
  textButtonDel: {
    fontSize: '15@s',
    color: '#D0021B',
    fontFamily: 'Futura Book font',
  },
  imgBack: {
    width: '11@s',
    height: '20@s',
    marginTop: '5@s',
    marginLeft: '18@s',
  },
  qrContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '15@s'
  },
  qrCode: {
    width: '130@s',
    height: '130@s',
    marginBottom: '14@s'
  },
  address: {
    fontFamily: 'Futura Light font',
    fontSize: '13@s',
    color: '#576574',
    textAlign: 'center'
  },
  groupMpdalPhoneText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '35@s',
  },
  buttonSms: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#2E86DE',
    marginLeft: '10@s',
    marginRight: '10@s'
  },
  historyTransactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36@s',
    paddingRight: '20@s',
    paddingLeft: '20@s',
  },
  cardHistoryContainer: {
    marginLeft: 0,
    padding: 0,
    borderTopLeftRadius: '10@s',
    borderTopRightRadius: '10@s',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff'
  },
  arrowDown: {
    width: '10@s',
    height: '6@s'
  },
  textHisTrans: {
    flex: 1,
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '34@s',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
    paddingRight: '20@s',
    paddingLeft: '20@s',
  },
  table: {
    flexDirection: 'column',
    paddingLeft: '18@s',
    paddingRight: '18@s'
  },
  row: {
    flexDirection: 'row',
    height: '30@s',
    alignItems: 'center',
  },
  titleTable: {
    fontFamily: 'Futura Heavy font',
    fontSize: '13@s',
    color: '#576574'
  },
  contentTimeTable: {
    fontFamily: 'Futura Book font',
    fontSize: '13@s',
    color: '#576574'
  },
  contentInOut: {
    fontFamily: 'Futura Book Italic',
    fontSize: '13@s',
    fontStyle: 'italic'
  },
  modalExportPrivateKey: {
    height: '130@s',
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  modalDropdown: {
    paddingLeft: '7@s',
    paddingRight: '7@s'
  },
  rowInput: {
    flexDirection: 'row',
    marginRight: '20@s',
    height: '37@s', borderBottomWidth: '1@s', borderBottomColor: '#E0E0E0', alignItems: 'center',
    marginBottom: '20@s'
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
    height: '37@s',
    paddingBottom: '9@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
    textAlign: 'center'
  },
  titleModal: {
    fontFamily: 'Futura Book font',
    fontSize: '14@s',
    color: '#576574',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '15@s',
    marginBottom: '5@s'
  },
  rowInput2: {
    height: '45@s',
    borderBottomWidth: '1@s', borderBottomColor: '#E0E0E0',
    marginRight: '20@s', marginLeft: '20@s', marginBottom: '10@s',
  },
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '35@s',
    width: '150@s',
    position: 'absolute',
    bottom: 0
  },
  buttonCancel: {
    fontFamily: 'Futura Light font',
    fontSize: '13@s',
    color: '#576574',
    marginLeft: '10@s',
    marginRight: '10@s',
    fontWeight: 'bold'
  }
});