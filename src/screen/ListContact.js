import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Creators as ContactCreators} from '../store/ducks/contact';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image} from 'react-native-elements';

import {ROUTE_NAMES} from '../helpers/Contants';
import metrics from '../styles/metrics';
import colors from '../styles/colors';

function ListContact({navigation, storeContact, contactActions}) {
  React.useEffect(() => {
    contactActions.getListContactRequest();
  }, []);

  const FloatingButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTE_NAMES.DETAIL_CONTACT)}
        style={styles.floatingButton}>
        <Text style={{fontSize: 50, color: 'white'}}>+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {storeContact.loading ? (
        <ActivityIndicator style={{marginTop: metrics.getHeightFromDP('5%')}} />
      ) : (
        <FlatList
          data={storeContact?.listData?.finalData}
          keyExtractor={item => item.id}
          stickyHeaderIndices={storeContact?.listData?.stickeyIndex}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (item.type == 'name') {
                  navigation.navigate(ROUTE_NAMES.DETAIL_CONTACT, {item});
                }
              }}>
              <View style={item.type == 'name' ? styles.item : styles.head}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.name.length > 1 && (
                    <Image
                      style={{
                        width: metrics.getWidthFromDP('16%'),
                        height: metrics.getWidthFromDP('16%'),
                        borderRadius: metrics.getHeightFromDP('16%') / 2,
                      }}
                      resizeMode="cover"
                      source={{
                        uri:
                          item.imageUrl.match(/https/g) ||
                          item.imageUrl.match(/http/g)
                            ? item.imageUrl
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGfMSD5dY_AFyjh6SKVAMwCO88-3V3dzWCg&usqp=CAU',
                      }}
                    />
                  )}
                  <Text
                    style={
                      item.type == 'name' ? styles.itemTxt : styles.headTxt
                    }>
                    {item.name} {item.age && <Text>{`(${item.age})`}</Text>}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <FloatingButton
        onPress={() => navigation.navigate(ROUTE_NAMES.DETAIL_CONTACT)}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  storeContact: state.contact,
});

const mapDispatchToProps = dispatch => ({
  contactActions: bindActionCreators(ContactCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListContact);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderColor: '#fff',
  },
  head: {
    padding: 5,
    paddingVertical: 5,
    backgroundColor: '#fff',
    elevation: 2,
  },
  itemTxt: {
    fontSize: 18,
    marginLeft: 10,
  },
  headTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    backgroundColor: colors.green,
    width: metrics.getWidthFromDP('16%'),
    height: metrics.getWidthFromDP('16%'),
    borderRadius: metrics.getWidthFromDP('16%') / 2,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const data = [
  {
    id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'Luke',
    lastName: 'Skywalker',
    age: 20,
    photo: 'N/A',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bruno_Fernandes_Portugal%2C_2018.jpg/220px-Bruno_Fernandes_Portugal%2C_2018.jpg',
    firstName: 'Reza',
    lastName: 'Lukman',
    age: 25,
    id: 'd2927d60-645b-11ec-be24-2506582b46a7',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bruno_Fernandes_Portugal%2C_2018.jpg/220px-Bruno_Fernandes_Portugal%2C_2018.jpg',
    firstName: 'Bruno',
    lastName: 'Penaldes',
    age: 29,
    id: 'f05f9440-645b-11ec-be24-2506582b46a7',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bruno_Fernandes_Portugal%2C_2018.jpg/220px-Bruno_Fernandes_Portugal%2C_2018.jpg',
    firstName: 'Zlatan',
    lastName: 'Ibra',
    age: 42,
    id: '4efbb3d0-645c-11ec-be24-2506582b46a7',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bruno_Fernandes_Portugal%2C_2018.jpg/220px-Bruno_Fernandes_Portugal%2C_2018.jpg',
    firstName: 'Bruynet',
    lastName: 'Kevin',
    age: 67,
    id: 'fda80aa0-645c-11ec-be24-2506582b46a7',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bruno_Fernandes_Portugal%2C_2018.jpg/220px-Bruno_Fernandes_Portugal%2C_2018.jpg',
    firstName: 'Cristiano',
    lastName: 'Ronal',
    age: 21,
    id: '4c9b8740-645d-11ec-be24-2506582b46a7',
  },
  {
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bruno_Fernandes_Portugal%2C_2018.jpg/220px-Bruno_Fernandes_Portugal%2C_2018.jpg',
    firstName: 'Diogoboy',
    lastName: 'Dalotan',
    age: 99,
    id: 'fba73c20-645d-11ec-be24-2506582b46a7',
  },
  {
    firstName: 'Christy',
    lastName: 'All',
    age: 12,
    photo:
      'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTrFpmUMWcJHWqaaJL9FOdriY9DJXNTzdEODwV6I2FvOrJ6HVa9FznAy2jsURqz',
    id: '58d79e40-6480-11ec-be24-2506582b46a7',
  },
];
