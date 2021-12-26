import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {Creators as ContactCreators} from '../store/ducks/contact';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import colors from '../styles/colors';
import metrics from '../styles/metrics';
import {Icon, Image} from 'react-native-elements';
import {ROUTE_NAMES} from '../helpers/Contants';

const imageDefault =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGfMSD5dY_AFyjh6SKVAMwCO88-3V3dzWCg&usqp=CAU';

const initialProfile = {
  firstName: '',
  lastName: '',
  age: '',
  id: '',
  imageUrl: imageDefault,
  firstNameErr: false,
  lastNameErr: false,
  ageErr: false,
};

const DetailContact = ({navigation, route, storeContact, contactActions}) => {
  const [profile, setProfile] = React.useState(initialProfile);
  const [edit, setEdit] = React.useState(
    route.params !== undefined ? false : true,
  );

  React.useEffect(() => {
    if (route.params !== undefined) {
      const data = route.params.item;
      setProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age.toString(),
        id: data.personId,
        imageUrl: data.imageUrl,
        firstNameErr: false,
        lastNameErr: false,
        ageErr: false,
      });
    }
  }, [route.params !== undefined]);

  React.useEffect(() => {
    if (
      storeContact.succcessPost ||
      storeContact.succcessDelete ||
      storeContact.succcessUpdate
    ) {
      navigation.navigate(ROUTE_NAMES.LIST_CONTACT2);
    }
  }, [
    storeContact.succcessPost ||
      storeContact.succcessDelete ||
      storeContact.succcessUpdate,
  ]);

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.defaultWhite,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <Icon
          type="material-community"
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Icon
          type="material-community"
          name="check"
          size={30}
          color="black"
          onPress={submit}
        />
      </View>
    );
  };

  function onPressDelete() {
    contactActions.deleteContactRequest({id: profile.id});
  }

  function submit() {
    if (
      profile.firstName.trim().length > 3 &&
      profile.lastName.trim().length > 3 &&
      profile.age.trim().length > 0 &&
      profile.age.trim() !== 0
    ) {
      const data = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        photo: profile.imageUrl,
      };
      if (route.params !== undefined) {
        contactActions.updateContactRequest({
          id: profile.id,
          data: data,
        });
      } else {
        contactActions.postingContactRequest({
          data: data,
        });
      }
    } else {
      if (profile.firstName.trim().length <= 3) {
        setProfile(prev => ({...prev, firstNameErr: true}));
      }
      if (profile.lastName.trim().length <= 3) {
        setProfile(prev => ({...prev, lastNameErr: true}));
      }
      if (profile.age.trim().length == 0 || profile.age.trim() == 0) {
        setProfile(prev => ({...prev, ageErr: true}));
      }
    }
  }

  const Button = props => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: props.type == 'Edit' ? colors.green : colors.red,
            marginRight: props.type == 'Edit' ? 20 : 0,
          },
        ]}
        onPress={props.onPress}>
        <Text style={{color: colors.defaultWhite}}>{props.type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Header />
      <ScrollView contentContainerStyle={styles.containerDetail}>
        <Image
          source={{
            uri:
              profile.imageUrl.match(/https/g) ||
              profile.imageUrl.match(/http/g)
                ? profile.imageUrl
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGfMSD5dY_AFyjh6SKVAMwCO88-3V3dzWCg&usqp=CAU',
          }}
          style={styles.imageProfile}
          resizeMode="cover"
        />
        <View style={{marginTop: metrics.getHeightFromDP('8%')}}>
          <View style={{marginBottom: metrics.getHeightFromDP('3%')}}>
            <TextInput
              editable={edit}
              placeholder={'first name'}
              onChangeText={e => setProfile(prev => ({...prev, firstName: e}))}
              style={[
                styles.inputStyle,
                {
                  borderWidth: profile.firstNameErr ? 1 : 0,
                  borderColor: profile.firstNameErr
                    ? colors.red
                    : 'transparent',
                },
              ]}
              keyboardType={'default'}
              value={profile.firstName}
              onSubmitEditing={() => {
                if (profile.firstName.trim().length <= 3) {
                  setProfile(prev => ({...prev, firstNameErr: true}));
                }
                setProfile(prev => ({...prev, firstNameErr: false}));
              }}
              onBlur={() => {
                if (profile.firstName.trim().length <= 3) {
                  setProfile(prev => ({...prev, firstNameErr: true}));
                }
                setProfile(prev => ({...prev, firstNameErr: false}));
              }}
            />
            {profile.firstNameErr && (
              <Text style={styles.errorText}>
                Nama pertama tidak boleh kosong atau kurang dari 3 karakter
              </Text>
            )}
          </View>

          <View style={{marginBottom: metrics.getHeightFromDP('3%')}}>
            <TextInput
              editable={edit}
              placeholder={'last name'}
              onChangeText={e => setProfile(prev => ({...prev, lastName: e}))}
              style={[
                styles.inputStyle,
                {
                  borderWidth: profile.lastNameErr ? 1 : 0,
                  borderColor: profile.lastNameErr ? colors.red : 'transparent',
                },
              ]}
              keyboardType={'default'}
              value={profile.lastName}
              onSubmitEditing={() => {
                if (profile.lastName.trim().length <= 3) {
                  setProfile(prev => ({...prev, lastNameErr: true}));
                }
                setProfile(prev => ({...prev, lastNameErr: false}));
              }}
              onBlur={() => {
                if (profile.lastName.trim().length <= 3) {
                  setProfile(prev => ({...prev, lastNameErr: true}));
                }
                setProfile(prev => ({...prev, lastNameErr: false}));
              }}
            />
            {profile.lastNameErr && (
              <Text style={styles.errorText}>
                Nama terakhir tidak boleh kosong atau kurang dari 3 karakter
              </Text>
            )}
          </View>

          <View style={{marginBottom: metrics.getHeightFromDP('3%')}}>
            <TextInput
              editable={edit}
              placeholder={'age'}
              onChangeText={e => setProfile(prev => ({...prev, age: e}))}
              style={[
                styles.inputStyle,
                {
                  borderWidth: profile.ageErr ? 1 : 0,
                  borderColor: profile.ageErr ? colors.red : 'transparent',
                },
              ]}
              keyboardType={'number-pad'}
              value={profile.age}
              onSubmitEditing={() => {
                if (profile.age.trim().length == 0 || profile.age.trim() == 0) {
                  setProfile(prev => ({...prev, ageErr: true}));
                }
                setProfile(prev => ({...prev, ageErr: false}));
              }}
              onBlur={() => {
                if (profile.age.trim().length == 0 || profile.age.trim() == 0) {
                  setProfile(prev => ({...prev, ageErr: true}));
                }
                setProfile(prev => ({...prev, ageErr: false}));
              }}
            />
            {profile.ageErr && (
              <Text style={styles.errorText}>
                Usia tidak boleh kosong atau 0
              </Text>
            )}
          </View>

          {route.params !== undefined && (
            <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
              <Button type={'Edit'} onPress={() => setEdit(true)} />
              <Button
                type={'Delete'}
                onPress={() =>
                  Alert.alert(
                    'Delete Contact',
                    'Are you sure want to delete' +
                      `${route.params.item.name}?`,
                    [
                      {
                        text: 'Cancel',
                      },
                      {text: 'OK', onPress: onPressDelete},
                    ],
                    {cancelable: false},
                  )
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  storeContact: state.contact,
});

const mapDispatchToProps = dispatch => ({
  contactActions: bindActionCreators(ContactCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailContact);

const styles = StyleSheet.create({
  containerDetail: {
    alignItems: 'center',
    backgroundColor: colors.defaultWhite,
    height: metrics.getHeightFromDP('100%'),
  },
  inputStyle: {
    height: metrics.getHeightFromDP('6%'),
    width: metrics.getWidthFromDP('90%'),
    backgroundColor: '#fafafa',
    borderRadius: metrics.getWidthFromDP('2%'),
    fontSize: 16,
    paddingHorizontal: 18,
    // marginBottom: metrics.getHeightFromDP('4%'),
  },
  imageProfile: {
    width: metrics.getWidthFromDP('30%'),
    height: metrics.getWidthFromDP('30%'),
    borderRadius: metrics.getWidthFromDP('30%') / 2,
  },
  errorText: {marginTop: 5, color: colors.red},
  button: {
    width: metrics.getWidthFromDP('25%'),
    height: metrics.getHeightFromDP('4%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
