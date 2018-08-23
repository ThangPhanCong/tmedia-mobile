import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import { disMissWallethistory } from '../navigation';
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
      listHistory: [
        {
          time: '10:00 01/12/18',
          type: 'IN',
          TXID: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
          amount: '1.5 BTC'
        },
        {
          time: '10:00 01/12/18',
          type: 'OUT',
          TXID: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
          amount: '1.5 BTC'
        },
        {
          time: '10:00 01/12/18',
          type: 'IN',
          TXID: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
          amount: '1.5 BTC'
        }
        ]
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>History</Text>
          <TouchableOpacity style={styles.iconBackContainer} onPress={() => disMissWallethistory()}>
            <Image style={styles.iconBack}
                   source={require('../../../assets/back/backColor.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={[styles.row, { borderBottomColor: '#E0E0E0', borderBottomWidth: scale(1) }]}>
            <Text style={[styles.titleTable, { flex: 2, textAlign: 'center' }]}>Time</Text>
            <Text style={[styles.titleTable, { flex: 2, textAlign: 'center' }]}/>
            <Text style={[styles.titleTable, { flex: 3.2, textAlign: 'center' }]}>TXID</Text>
            <Text style={[styles.titleTable, { flex: 2, textAlign: 'right' }]}>Amount</Text>
          </View>
          <ScrollView>
            {
              this.state.listHistory.map((object, index) =>
                <View style={[styles.row, { marginBottom: scale(6) }]} key={index}>
                  <Text style={[styles.contentTimeTable, { flex: 2, textAlign: 'center' }]}>{object.time}</Text>
                  <Text style={[styles.contentInOut, object.type === 'IN' ? {color: '#10AC84'} : {color: '#D0021B'}]}>{object.type}</Text>
                  <Text style={[styles.address, { flex: 3.2 }]} numberOfLines={1}>{object.TXID}</Text>
                  <Text style={[styles.contentTimeTable, { flex: 2, textAlign: 'right' }]}>{object.amount}</Text>
                </View>
              )
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Futura Medium font', color: '#576574', fontSize: '17@s', fontWeight: 'bold', textAlign: 'center',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row', alignItems: 'center', height: '60@s',
  },
  iconBack: {
    width: '12@s', height: '20@s'
  },
  iconBackContainer: {
    position: 'absolute', left: '20@s'
  },
  table: {
    flexDirection: 'column', flex: 1
  },
  row: {
    flexDirection: 'row', height: '35@s', alignItems: 'center', paddingLeft: '18@s', paddingTop: '5@s',
    paddingRight: '18@s'
  },
  titleTable: {
    fontFamily: 'Futura Heavy font', fontSize: '13@s', color: '#576574'
  },
  contentTimeTable: {
    fontFamily: 'Futura Book font', fontSize: '13@s', color: '#576574'
  },
  contentInOut: {
    fontFamily: 'Futura Book Italic', fontSize: '13@s', fontStyle: 'italic', flex: 2, textAlign: 'center'
  },
  address: {
    fontFamily: 'Futura Light font', fontSize: '13@s', color: '#576574', textAlign: 'center',
  },
})