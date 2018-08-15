import React, { PureComponent } from 'react';
import { View, Text, Image, TextInput, ScrollView, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native';
import ScaledSheet from "../../libs/reactSizeMatter/ScaledSheet";
import { Navigation } from 'react-native-navigation';

class QrCodeScreen extends PureComponent {
  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },

    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Navigation.dismissOverlay(this.props.componentId)}>
        <View style={styles.screen}>
          <Image resizeMode={'contain'} source={require('../../../assets/qrCode/frame.png')} style={styles.imgQrcode}/>
        </View>
      </TouchableWithoutFeedback>

    )
  }
}

export default QrCodeScreen;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgQrcode: {
    width: '300@s',
    height: '300@s',
  }
});