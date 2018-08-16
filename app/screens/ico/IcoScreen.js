import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, ScrollView, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import SwitchSelector from 'react-native-switch-selector';
import * as Progress from 'react-native-progress';
import { goQrCode } from "../navigation";

const { height } = Dimensions.get('window');


class IcoScreen extends PureComponent {
  state = {
    ethAddress: null,
    isShowEthAddress: false,
    isShowInputEthAddress: false,
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

  _changeAddressETH(ethAddress) {
    this.setState({ ethAddress });
  }

  _submitAddressETH() {
    const { ethAddress } = this.state;

    ethAddress ? this.setState({ isShowInputEthAddress: false }) : null
  }

  _showInputAddressEth() {
    this.setState({ isShowInputEthAddress: true });
  }

  _renderDepositAddress() {
    return (
      <View style={styles.depositContainer}>
        <Text style={styles.titleDeposit}>Deposit Address</Text>

        <View style={styles.qrCodeContainer}>
          <Text style={styles.qrCode}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</Text>
          <TouchableWithoutFeedback onPress={() => goQrCode()}>
            <View>
              <Image source={require('../../../assets/qrCode/qr-code.png')} style={styles.imgQrcode}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  _renderEthAddress() {
    const { isShowInputEthAddress, ethAddress } = this.state;
    const conditionEthAddress = !ethAddress ? <View>
      <Text style={styles.titleEth}>Your ETH Address</Text>

      <View style={styles.qrCodeContainer}>
        <Text style={styles.qrCode}>You have no ETH Address</Text>
        <TouchableWithoutFeedback onPress={() => this._showInputAddressEth()}>
          <View>
            <Text style={styles.addQrcode}>Add</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View> : <View>
      <Text style={styles.titleEth}>Your ETH Address</Text>
      <View style={styles.qrCodeContainer}>
        <Text style={styles.qrCode}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</Text>
      </View>
    </View>;

    return (
      <View style={styles.ethContainer}>
        {isShowInputEthAddress ? <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.titleEth, { flex: 1 }]}>Ethereum Address</Text>
            <TouchableWithoutFeedback onPress={() => goQrCode()}>
              <View>
                <Image source={require('../../../assets/qrCode/qr-code.png')} style={styles.imgQrcode}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.inputAddressETH}>
            <TextInput onChangeText={value => this._changeAddressETH(value)} underlineColorAndroid={'#E0E0E0'}/>
            <Text style={styles.noteAdrressEth}>Do not input an ETH address of a cryptocurrency exchange.</Text>
            <TouchableWithoutFeedback onPress={() => this._submitAddressETH()}>
              <View>
                <Text style={styles.submitAddressETH}>Ok</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View> : conditionEthAddress
        }
      </View>
    )
  }

  _renderItemHistory({ item }) {
    return (
      <View style={styles.contentTable}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.contentDateTime}>{item.time}</Text>
          <Text style={styles.contentDateTime}>{item.date}</Text>
        </View>

        <Text style={styles.contentHistory}>{item.activity}</Text>
        <Text style={[styles.contentHistory, { textAlign: 'left' }]}>{item.amount}</Text>
        <Text style={styles.contentHistory}>{item.status}</Text>
      </View>
    )
  }

  _renderTableHistory() {
    const data = [];

    return (
      <View style={styles.tableHistoryContainer}>
        {data.length ? <View>
          <View style={styles.headerTable}>
            <Text style={styles.headerItem}>Time</Text>
            <Text style={styles.headerItem}>Activity</Text>
            <Text style={styles.headerItem}>Amount</Text>
            <Text style={styles.headerItem}>Status</Text>
          </View>

          <FlatList
            style={styles.listHistory}
            data={data}
            renderItem={this._renderItemHistory.bind(this)}
          />
        </View> : <Text style={styles.noActivity}>No activity</Text>}


      </View>
    )
  }

  _renderHistoryActivities() {
    return (
      <View style={styles.historyContainer}>
        <ScrollView>
          <View style={styles.titleHistoryContainer}>
            <Text style={styles.titleHistory}>History activities</Text>
          </View>
          {this._renderTableHistory()}
        </ScrollView>

      </View>
    )
  }

  render() {
    const optionSale = [
      { label: 'Private sale', value: '1' },
      { label: 'Public sale', value: '1.5' },
    ];

    const optionCoin = [
      { label: 'BTC', value: '1' },
      { label: 'ETH', value: '1.5' },
    ];

    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <View>
          <Image source={require('../../../assets/backgroundTimeIco/backgroundTimeIco.png')}
                 style={styles.imgBackgroundTimeIco}/>
          <Text style={styles.textPublic}>
            THE PUBLIC SALE WILL END IN
          </Text>

          <Text style={styles.timeIco}>
            8 23 : 30 : 30
          </Text>
        </View>


        <View style={styles.titleTime}>
          <Text style={styles.textItemTime}>DAYS</Text>
          <Text style={styles.textItemTimeSpace}>HOURS</Text>
          <Text style={styles.textItemTimeSpace}>MINUTES</Text>
          <Text style={styles.textItemTimeSpace}>SECONDS</Text>
        </View>

        <View style={styles.countCoin}>
          <View style={styles.countCoinItem}>
            <Text style={styles.itemCoin}>1 BTC</Text>
            <Text style={styles.itemCoin}> = 3,000 ABC</Text>
          </View>

          <View style={[styles.countCoinItem, { marginLeft: scale(10) }]}>
            <Text style={styles.itemCoin}>1 BTC</Text>
            <Text style={styles.itemCoin}> = 3,000 ABC</Text>
          </View>
        </View>
        <View style={styles.switchSale}>
          <SwitchSelector options={optionSale} initial={0}
                          selectedColor={'#FFF'}
                          buttonColor={'#576574'}
                          height={scale(40)}
                          fontSize={scale(12)}
                          onPress={value => console.log(`Call onPress with value: ${value}`)}/>
        </View>

        <View>
          <View>
            <Image source={require('../../../assets/circleProgress/circleProgress.png')}
                   style={styles.imgCircleProgress}/>
            <Text style={styles.progressValue}>80</Text>
          </View>

          <View style={styles.progressBar}>
            <Progress.Bar progress={0.8} width={scale(315)}
                          borderWidth={0}
                          height={scale(8)}
                          color={'#838B94'}
                          unfilledColor={'#D8D8D8'}/>
            <Text style={styles.textRatio}>8,000,000 / 10,000,000</Text>
          </View>
        </View>

        {this._renderDepositAddress()}

        <View style={styles.switchCoin}>
          <SwitchSelector options={optionCoin} initial={0}
                          selectedColor={'#FFF'}
                          buttonColor={'#576574'}
                          height={scale(20)}
                          fontSize={scale(12)}
                          onPress={value => console.log(`Call onPress with value: ${value}`)}/>
        </View>

        {this._renderEthAddress()}
        {this._renderHistoryActivities()}
      </ScrollView>
    )
  }
}

export default IcoScreen;

const positionRight = (315 - (1 - 0.8) * 315) + 20;
const positionRightValue = (315 - (1 - 0.8) * 315) + 26;

const styles = ScaledSheet.create({
  screen: {
    flexGrow: 1,
  },
  imgBackgroundTimeIco: {
    width: '375@s',
    height: '242@s',
  },
  textPublic: {
    position: 'absolute',
    fontSize: '20@s',
    alignSelf: 'center',
    color: '#FFF',
    top: '52@s'
  },
  timeIco: {
    fontSize: '50@s',
    alignSelf: 'center',
    position: 'absolute',
    top: '70@s',
    color: '#FFF',
    fontFamily: 'FS Siruca',
    letterSpacing: '2.5@s',
  },
  titleTime: {
    flexDirection: 'row',
    marginLeft: '35@s',
    marginRight: '48@s',
    position: 'absolute',
    top: '140@s'
  },
  textItemTime: {
    color: '#FFF',
    fontSize: '14@s',
    fontFamily: 'UTM BanqueR'
  },
  textItemTimeSpace: {
    color: '#FFF',
    fontSize: '14@s',
    fontFamily: 'UTM BanqueR',
    marginLeft: '12@s'
  },
  countCoin: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    top: '170@s'
  },
  countCoinItem: {
    flexDirection: 'row',
  },
  itemCoin: {
    color: '#FFF',
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular'
  },
  switchSale: {
    position: 'absolute',
    top: '220@s',
    alignSelf: 'center',
    width: '200@s',
  },
  switchCoin: {
    position: 'absolute',
    top: '380@s',
    alignSelf: 'center',
    width: '128@s',
  },
  imgCircleProgress: {
    width: '21@s',
    height: '27@s',
    position: 'absolute',
    left: `${positionRight}@s`,
    top: '22@s',
  },
  progressValue: {
    fontSize: '8@s',
    position: 'absolute',
    top: '26@s',
    left: `${positionRightValue}@s`,
    color: '#576574',
    fontFamily: 'Futura Light Regular'
  },
  progressBar: {
    position: 'absolute',
    left: '30@s',
    top: '50@s',
  },
  textRatio: {
    position: 'absolute',
    fontSize: '10@s',
    left: '215@s',
    top: '14@s',
    color: '#576574'
  },
  depositContainer: {
    width: '315@s',
    height: '63@s',
    marginTop: '90@s',
    left: '30@s',
    backgroundColor: '#FFF'
  },
  titleDeposit: {
    fontSize: '13@s',
    fontFamily: 'Futura',
    color: '#576574'
  },
  qrCodeContainer: {
    flexDirection: 'row',
    marginTop: '5@s'
  },
  qrCode: {
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    color: '#576574',
    flex: 1,
    marginLeft: '10@s',
    marginBottom: '10@s',
    textAlign: 'center'
  },
  imgQrcode: {
    width: '21@s',
    height: '20@s',
    marginRight: '10@s'
  },
  ethContainer: {
    width: '315@s',
    left: '30@s',
    marginTop: '20@s',
    backgroundColor: '#FFF'
  },
  titleEth: {
    fontSize: '13@s',
    fontFamily: 'Futura',
    color: '#576574'
  },
  addQrcode: {
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    color: '#10AC84',
    marginRight: '10@s'
  },
  historyContainer: {
    marginTop: '10@s',
    flex: 1,
    left: '30@s',
    width: '315@s',
    backgroundColor: '#FFF'
  },
  titleHistoryContainer: {
    borderBottomWidth: '1@s',
    borderBottomColor: '#E0E0E0'
  },
  titleHistory: {
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    marginBottom: '4@s'
  },
  tableHistoryContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  headerTable: {
    flexDirection: 'row',
    marginLeft: '23@s',
    marginTop: '5@s'
  },
  headerItem: {
    flex: 1,
    fontSize: '13@s',
    color: '#576574'
  },
  contentTable: {
    flexDirection: 'row',
    marginTop: '5@s',
  },
  contentHistory: {
    flex: 1,
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    color: '#576574'
  },
  dateTimeContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  contentDateTime: {
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    color: '#576574'
  },
  listHistory: {
    flex: 1,
    height: '100@s'
  },
  noActivity: {
    textAlign: 'center',
    fontSize: '13@s',
    fontFamily: 'Futura Light Regular',
    marginTop: '4@s'
  },
  inputAddressETH: {
    flexDirection: 'column',
  },
  noteAdrressEth: {
    color: '#F86C6B',
    fontSize: '11@s',
    textAlign: 'center'
  },
  submitAddressETH: {
    fontSize: '15@s',
    color: '#10AC84',
    textAlign: 'center',
    marginTop: '12@s',
    marginBottom: '14@s',
  }
});