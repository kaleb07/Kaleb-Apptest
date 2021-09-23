import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../styles/colors';
import metrics from '../styles/metrics';
import { navigate } from '../helpers/RootNavigation';
import { ROUTE_NAMES } from '../helpers/Contants';

const Card = ({ data, navigation }) => {

  return (
    <View style={{ flex: 1, backgroundColor: colors.cultured }}>
      <TouchableOpacity
        onPress={() => navigate(ROUTE_NAMES.DETAIL_TRANSACTION, {data: data.item})}
        style={{
          ...style.containerCard,
          borderLeftColor: data.status == 'PENDING' ? colors.outrageousOrange : colors.mint,
        }}
      >
        <View style={style.containerText}>
          <View style={style.row}>
            <Text style={style.textTitle}>{data.senderBank.toUpperCase()}</Text>
            <Icon
              type="material-community"
              name={'arrow-right-thick'}
              size={25}
              color={colors.defaultBlack}
              style={{ marginHorizontal: metrics.getWidthFromDP('0.5%') }}
            />
            <Text style={style.textTitle}>{data.beneficiaryBank.toUpperCase()}</Text>
          </View>
          <Text style={style.textContent}>{data.beneficiaryName}</Text>
          <View style={[style.row, { alignItems: 'center' }]}>
            <Text style={style.textContent}>{'Rp' + data.amount}</Text>
            <Icon
              type="material-community"
              name={'circle'}
              size={10}
              color={colors.defaultBlack}
              style={{ marginHorizontal: metrics.getWidthFromDP('2%') }}
            />
            <Text style={style.textContent}>{data.date}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View style={{
            ...style.containerStatus,
            borderColor: data.status == 'PENDING' ? colors.outrageousOrange : colors.mint,
            backgroundColor: data.status == 'PENDING' ? colors.defaultWhite : colors.mint,
          }}>
            <Text style={{
              fontWeight: 'bold',
              color: data.status == 'PENDING' ? colors.defaultBlack : colors.defaultWhite,
            }}>
              {data.status == 'PENDING' ? 'Pengecekan' : 'Berhasil'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  containerCard: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: metrics.getWidthFromDP('3%'),
    borderRadius: metrics.getWidthFromDP('3%'),
    backgroundColor: colors.defaultWhite,
    borderLeftWidth: metrics.getWidthFromDP('1.5%'),
    padding: metrics.getWidthFromDP('3%'),
    justifyContent: 'space-between'
  },
  containerText: {
    flexDirection: 'column',
    width: metrics.getWidthFromDP('65%'),
  },
  textTitle: {
    color: colors.defaultBlack,
    fontWeight: 'bold',
    fontSize: metrics.getWidthFromDP('4%')
  },
  textContent: {
    color: colors.defaultBlack,
    fontSize: metrics.getWidthFromDP('3.5%')
  },
  containerStatus: {
    borderWidth: 2,
    padding: metrics.getWidthFromDP('1%'),
    borderRadius: metrics.getWidthFromDP('1%'),
    alignSelf: 'center',
    paddingHorizontal: metrics.getWidthFromDP('2%'),
  }
});

export default Card;
