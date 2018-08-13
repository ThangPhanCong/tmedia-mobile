import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import SwitchSelector from 'react-native-switch-selector';

class IcoScreen extends PureComponent {
  static get options() {

    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },

    };
  }

  componentWillMount() {

  }

  render() {
    const optionSale = [
      { label: 'Private sale', value: '1' },
      { label: 'Public sale', value: '1.5' },
    ];
    return (
      <View style={styles.screen}>
        <Image source={require('../../../assets/backgroundTimeIco/backgroundTimeIco.png')}
               style={styles.imgBackgroundTimeIco}/>
        <Text style={styles.textPublic}>
          THE PUBLIC SALE WILL END IN
        </Text>

        <Text style={styles.timeIco}>
          8 23 : 30 : 30
        </Text>

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
                          fontSize={scale(12)}
                          onPress={value => console.log(`Call onPress with value: ${value}`)}/>
        </View>

      </View>
    )
  }
}

export default IcoScreen;

const styles = ScaledSheet.create({
  screen: {
    flex: 1
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
    top: '25%'
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
    top: '30%'
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
    top: '37%',
    alignSelf: 'center',
    width: '200@s',
  },
});