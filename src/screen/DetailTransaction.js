import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { showMessage } from 'react-native-flash-message';
import colors from '../styles/colors';
import metrics from '../styles/metrics';
import { Icon } from 'react-native-elements';
import { ROUTE_NAMES, formatDate } from '../helpers/Contants';

const DetailTransaction = ({ navigation, route }) => {
  const { data } = route.params;

  const _handelCopyToClipBoard = (dataString) => {
    showMessage({
      message: 'Disalin ke papan klip',
      type: 'success',
      icon: 'success',
    });
    Clipboard.setString(dataString);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.containerDetail}>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>ID TRANSAKSI: #{data.id}</Text>
            <Icon
              type="material-community"
              name={'content-copy'}
              size={25}
              color={colors.burntSienna}
              style={{ transform: [{ rotateY: '180deg' }], marginLeft: 10 }}
              onPress={() => _handelCopyToClipBoard(data.id)}
            />
          </View>

          <View style={styles.lineHr} />

          <View style={{ ...styles.containerText, justifyContent: 'space-between' }}>
            <Text style={styles.textTitle}>DETAIL TRANSAKSI</Text>
            <Text
              style={[styles.textContent, { color: colors.outrageousOrange }]}
              onPress={() => navigation.navigate(ROUTE_NAMES.LIST)}>
              Tutup
						</Text>
          </View>

          <View style={styles.lineHr} />

          <View style={styles.containerText}>
            <Text style={[styles.textTitle, { fontSize: metrics.getWidthFromDP('4.3%') }]}>{data.sender_bank.toUpperCase()}</Text>
            <Icon
              type="material-community"
              name={'arrow-right-thick'}
              size={30}
              color={colors.defaultBlack}
              style={{ marginHorizontal: metrics.getWidthFromDP('0.5%') }}
            />
            <Text style={[styles.textTitle, { fontSize: metrics.getWidthFromDP('4%') }]}>{data.beneficiary_bank.toUpperCase()}</Text>
          </View>

          <View style={styles.containerData}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{data.beneficiary_name}</Text>
              <Text style={styles.textContent}>{data.account_number}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{'NOMINAL'}</Text>
              <Text style={styles.textContent}>{'Rp' + data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </View>
          </View>

          <View style={styles.containerData}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{'BERITA TRANSFER'}</Text>
              <Text style={styles.textContent}>{data.remark}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{'KODE UNIK'}</Text>
              <Text style={styles.textContent}>{data.unique_code}</Text>
            </View>
          </View>

          <View style={styles.containerData}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.textContent, { fontWeight: 'bold' }]}>{'WAKTU DIBUAT'}</Text>
              <Text style={styles.textContent}>{formatDate(data.created_at)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailTransaction

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: colors.defaultWhite,
    marginTop: metrics.getHeightFromDP('5%'),
  },
  containerText: {
    flexDirection: 'row',
    marginVertical: metrics.getHeightFromDP('2%'),
    marginHorizontal: metrics.getWidthFromDP('5%')
  },
  textTitle: {
    fontSize: metrics.getWidthFromDP('3.5%'),
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: metrics.getWidthFromDP('3.5%'),
  },
  lineHr: {
    borderWidth: 0.4,
    borderColor: colors.silverChalice,
    marginHorizontal: metrics.getWidthFromDP('2%'),
  },
  containerData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: metrics.getWidthFromDP('80%'),
    marginHorizontal: metrics.getWidthFromDP('5%'),
    marginRight: metrics.getWidthFromDP('5%'),
    marginBottom: metrics.getHeightFromDP('3%')
  },
});
