import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ScaledSheet from "../../libs/reactSizeMatter/ScaledSheet";
import DeviceInfo from 'react-native-device-info';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import ListCountry from '../../utils/cca2';
import Carousel from 'react-native-snap-carousel';
import { goQrCode, goBackMyPage } from "../navigation";
import ImagePicker from 'react-native-image-crop-picker';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";
import { Navigation } from 'react-native-navigation';

const { width } = Dimensions.get('window');

const NORTH_AMERICA = ListCountry;

class KycScreen extends React.Component {

  static TYPE_IMAGE = {
    DEFAULT: 'default',
    CAMERA: 'camera',
    GALLERY: 'gallery'
  }

  constructor(props) {
    super(props);
    let userLocaleCountryCode = DeviceInfo.getDeviceCountry();

    const userCountryData = getAllCountries()
      .filter(country => NORTH_AMERICA.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();

    let callingCode = null;
    let cca2 = userLocaleCountryCode;
    if (!cca2 || !userCountryData) {
      cca2 = 'US';
      callingCode = '1';
    } else {
      callingCode = userCountryData.callingCode;
    }
    this.state = {
      cca2,
      callingCode,
      entries: [
        {
          id: 1,
          title: 'Identity Card Front Side / Passport cover',
          name: require('../../../assets/idCard/id-card.png'),
          type: KycScreen.TYPE_IMAGE.DEFAULT
        },
        {
          id: 2,
          title: 'Identity Card Black Side / Passport cover',
          name: require('../../../assets/idCard/id-card.png'),
          type: KycScreen.TYPE_IMAGE.DEFAULT
        },
        {
          id: 3, title: 'Selfie With Photo ID And Note',
          name: require('../../../assets/idCard/id-card.png'),
          type: KycScreen.TYPE_IMAGE.DEFAULT
        }
      ],
      payloadKyc: {}
    }
  }

  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },

    };
  }


  static PAYLOAD_TYPE = {
    NAME: 'name',
    CITY: 'city',
    PASSPORT: 'passport',
    POSTAL: 'postal',
    ETH_ADDRESS: 'ethAddress'
  };

  async _pickImageCamera(index) {
    try {
      const image = await ImagePicker.openCamera({
        width: scale(265),
        height: scale(141),
        cropping: true,
        freeStyleCropEnabled: true,
      });

      const { entries } = this.state;
      entries[index] = { ...entries[index], ...{ name: { uri: image.path } }, ...{ type: KycScreen.TYPE_IMAGE.CAMERA } };

      this.setState({ entries });
    } catch (err) {
      console.log("Camera._error:", err.message)
    }
  }

  async _pickImageGallery(index) {
    try {
      const image = await ImagePicker.openPicker({
        width: scale(265),
        height: scale(141),
        cropping: true,
        freeStyleCropEnabled: true,
      });

      const { entries } = this.state;
      entries[index] = { ...entries[index], ...{ name: { uri: image.path } }, ...{ type: KycScreen.TYPE_IMAGE.GALLERY } };

      this.setState({ entries });
    } catch (err) {
      console.log("Gallery._error:", err.message)
    }

  }

  _onChaneParamsKyc(value, title) {
    const { payloadKyc } = this.state;

    payloadKyc[`${title}`] = value;
    this.setState({ payloadKyc });
  }

  _submitFormKyc() {
    this.props.onPassProp(true);
    goBackMyPage();
  }

  _renderItemAvatarUser({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image source={item.name} key={item.name} style={styles.imgAvatar}
               resizeMode={'stretch'}/>

        <View style={styles.viewSlide}>
          <Text style={styles.titleSlide}>{item.title}</Text>
          {
            item.type !== KycScreen.TYPE_IMAGE.DEFAULT ?
              <Image source={require('../../../assets/selectedAvatar/finish.png')}
                     style={styles.imgSelectedAvatar}/> : null
          }
        </View>

        <View style={styles.chooseImage}>
          <TouchableWithoutFeedback onPress={() => this._pickImageCamera(index)}>
            <View>
              <Image source={require('../../../assets/camera/camera.png')} style={styles.imgCamera}/>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this._pickImageGallery(index)}>
            <View>
              <Image source={require('../../../assets/gallery/gallery.png')} style={styles.imgGallery}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  _renderAvatarUser() {
    const { entries } = this.state;

    return (
      <View style={styles.carouselContainer}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={entries}
          renderItem={this._renderItemAvatarUser.bind(this)}
          sliderWidth={width}
          itemWidth={265}
        />
      </View>
    )
  }

  _renderTextInputKyc(title) {
    const { payloadKyc } = this.state;
    const valueInput = payloadKyc[`${title}`];

    return (
      <TextInput style={styles.inputKyc} value={valueInput} onChangeText={value => this._onChaneParamsKyc(value, title)}/>
    )
  }

  _renderFormSubmit() {
    const { payloadKyc, cca2 } = this.state;
    const isDisableSubmit = !payloadKyc.name || !payloadKyc.city || !payloadKyc.postal || !payloadKyc.passport || !payloadKyc.ethAddress || !cca2;

    return (
      <View style={styles.userInformation}>
        <View style={styles.formName}>
          <Text style={styles.fullName}>Full name</Text>
          {this._renderTextInputKyc(KycScreen.PAYLOAD_TYPE.NAME)}
        </View>

        <View style={styles.formCountry}>
          <Text style={styles.textCountry}>Country / Territory</Text>
          <CountryPicker
            countryList={NORTH_AMERICA}
            filterable={true}
            onChange={value => {
              this.setState({ cca2: value.cca2, callingCode: value.callingCode })
            }}
            cca2={this.state.cca2}
            translation="eng"
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.formCity}>
            <Text style={styles.titleKyc}>City</Text>
            {this._renderTextInputKyc(KycScreen.PAYLOAD_TYPE.CITY)}
          </View>
          <View style={styles.formPostal}>
            <Text style={styles.titleKyc}>Postal code</Text>
            {this._renderTextInputKyc(KycScreen.PAYLOAD_TYPE.POSTAL)}
          </View>
        </View>

        <View style={styles.passportId}>
          <Text style={styles.titleKyc}>Passport / ID</Text>
          {this._renderTextInputKyc(KycScreen.PAYLOAD_TYPE.PASSPORT)}
        </View>

        <View style={styles.ethAddress}>
          <View style={styles.inputAddress}>
            <Text style={[styles.titleKyc, { flex: 1 }]}>Ethereum Address</Text>
            {this._renderTextInputKyc(KycScreen.PAYLOAD_TYPE.ETH_ADDRESS)}
            <TouchableWithoutFeedback onPress={() => goQrCode()}>
              <View>
                <Image source={require('../../../assets/qrCode/qr-code.png')} style={styles.imgQrcode}/>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Text style={styles.noteKyc}>Do not input an ETH address of a cryptocurrency exchange.</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.viewSubmit} onPress={!isDisableSubmit ? () => this._submitFormKyc() : () => {
          }}>
            <View>
              <Text style={!isDisableSubmit ? styles.textSubmit : styles.textUnSubmit}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.screen}>
        <TouchableWithoutFeedback onPress={() => goBackMyPage()}>
          <View>
            <Image source={require('../../../assets/backBlack/back.png')}
                   style={styles.imgBack}/>
          </View>
        </TouchableWithoutFeedback>


        {this._renderAvatarUser()}
        {this._renderFormSubmit()}
      </View>

    )
  }
}

export default KycScreen;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column'
  },
  imgBack: {
    width: '12@s',
    height: '20@s',
    marginTop: '10@s',
    marginLeft: '18@s',
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: '1@s',
    color: '#777'
  },
  userInformation: {
    marginLeft: '45@s',
    marginRight: '45@s',
  },
  fullName: {
    fontSize: '12@s',
    color: '#576574',
    fontFamily: 'Futura Light Regular'
  },
  inputKyc: {
    height: '40@s',
    flex: 1
  },
  textCountry: {
    flex: 1,
    fontSize: '12@s',
    color: '#576574',
    fontFamily: 'Futura Light Regular'
  },
  passportId: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
  },
  ethAddress: {
    flexDirection: 'column',
  },
  inputAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
  },
  titleKyc: {
    fontSize: '12@s',
    color: '#576574',
    fontFamily: 'Futura Light Regular'
  },
  noteKyc: {
    color: '#F86C6B',
    fontSize: '11@s',
    fontFamily: 'Futura Light Regular',
    marginTop: '5@s'
  },
  viewSubmit: {
    marginTop: '30@s',
  },
  textSubmit: {
    textAlign: 'center',
    color: '#10AC84',
    fontSize: '16@s'
  },
  textUnSubmit: {
    textAlign: 'center',
    color: '#576574',
    fontSize: '16@s'
  },
  formCountry: {
    flexDirection: 'row',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
    marginBottom: '11.5@s',
    marginTop: '11.5@s',
    paddingBottom: '11.5@s'
  },
  formName: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s'
  },
  formCity: {
    flexDirection: 'row',
    flex: 2,
    marginRight: '11@s',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
    alignItems: 'center'
  },
  formPostal: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: '11@s',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: '1@s',
    alignItems: 'center'
  },
  slide: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '23@s',
  },
  viewSlide: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleSlide: {
    fontSize: '13@s',
    color: '#576574',
    textAlign: 'center',
    marginTop: '15@s',
    fontFamily: 'Futura Light Regular'
  },
  imgQrcode: {
    width: '21@s',
    height: '20@s',
    marginRight: '10@s'
  },
  chooseImage: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  imgCamera: {
    width: '25@s',
    height: '20@s',
    marginTop: '13@s',
    marginRight: '17@s'
  },
  imgGallery: {
    width: '23@s',
    height: '20@s',
    marginTop: '13@s',
    marginRight: '15@s',
    marginBottom: '11@s',
  },
  imgAvatar: {
    width: '265@s',
    height: '141@s'
  },
  carouselContainer: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: '1@s'
  },
  imgSelectedAvatar: {
    width: '16@s',
    height: '12@s',
    marginTop: '15@s',
    marginLeft: '4@s'
  }
});