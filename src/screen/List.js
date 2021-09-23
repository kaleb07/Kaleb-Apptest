import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Icon, CheckBox } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import colors from '../styles/colors';
import metrics from '../styles/metrics';
import Card from '../component/Card';
import { Creators as TransactionCreators } from '../store/ducks/transaction';
import { formatDate } from '../helpers/Contants';

const options = [
  { id: 1, label: 'URUTKAN' },
  { id: 2, label: 'Nama A-Z' },
  { id: 3, label: 'Nama Z-A' },
  { id: 4, label: 'Tanggal Terbaru' },
  { id: 5, label: 'Tanggal Terlama' }
];

const List = ({ storeTransaction, transactionActions }) => {
  const [keyword, setKeyword] = useState('');
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [chooseFilter, setchooseFilter] = useState(options[0]);
  const [listData, setData] = useState([]);
  const [listSearch, setSearch] = useState([]);

  useEffect(() => {
    transactionActions.getListTransactionRequest();
  }, []);

  useEffect(() => {
    setData(storeTransaction.listData);
  }, [storeTransaction.listData]);

  function search(keyword) {
    if (keyword) {
      let listSearch = [];
      listData.map(item => {
        const match = item.beneficiary_name.toLowerCase().includes(keyword.toLowerCase());

        if (match) {
          listSearch.push(item);
        }
      });
      setSearch(listSearch);
    }
  }

  /* filter sort by */
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  function filter(optionId) {
    let stringSort = stableSort(listData, getSorting("asc", 'beneficiary_name'));
    let numberSort = listData.sort((a, b) => a.created_at.replace(/\D/g, "").localeCompare(b.created_at.replace(/\D/g, "")));

    switch (optionId) {
      case 1:
        setData(storeTransaction.listData);
        break;
      case 2:
        setData(stringSort);
        break;
      case 3:
        setData(stringSort.reverse());
        break
      case 4:
        setData(numberSort.reverse());
        break;
      case 5:
        setData(numberSort);
        break;
      default:
        setData(cleanData());
        break;
    }
  }
  /*    */

  return (
    <SafeAreaView style={{ backgroundColor: colors.cultured, flex: 1 }}>
      <View>
        <Input
          placeholder={'Cari nama, bank, atau nominal'}
          value={keyword}
          containerStyle={style.containerSearch}
          inputContainerStyle={style.inputContainer}
          inputStyle={style.input}
          rightIcon={
            <TouchableOpacity style={style.containerFilter} onPress={() => setOpenFilter(true)}>
              <Text style={style.textFilter}>{chooseFilter.label}</Text>
              <Icon
                type="material-community"
                name={'chevron-down'}
                size={35}
                color={colors.burntSienna}
              />
            </TouchableOpacity>
          }
          leftIcon={
            <Icon
              type="material-community"
              name={'magnify'}
              size={35}
              color={colors.silverChalice}
            />
          }
          onChangeText={text => {
            setKeyword(text);
            search(text);
          }}
        />
        {storeTransaction.listData.length == 0 ? (
          <View style={style.loadingWrapper}>
            <ActivityIndicator
              size={'large'}
              color={colors.outrageousOrange}
            />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={keyword ? listSearch : listData}
            renderItem={({ item }) => (
              <View style={{ marginBottom: metrics.getHeightFromDP('2%') }}>
                <Card
                  data={{
                    beneficiaryBank: item.beneficiary_bank,
                    senderBank: item.sender_bank,
                    beneficiaryName: item.beneficiary_name,
                    status: item.status,
                    amount: item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                    date: formatDate(item.created_at),
                    item,
                  }}
                />
              </View>
            )}
          />
        )}
      </View>

      <Modal
        isVisible={isOpenFilter}
        onBackdropPress={() => setOpenFilter(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        coverScreen={true}
        transparant={true}
        style={{ flex: 1 }}>
        <View style={style.containerModal}>
          {options.map(item => (
            <View key={item.id.toString()} style={{ marginBottom: 16 }}>
              <CheckBox
                title={item.label}
                iconType="material-community"
                checkedIcon="radiobox-marked"
                uncheckedIcon="checkbox-blank-circle-outline"
                uncheckedColor={colors.outrageousOrange}
                checkedColor={colors.outrageousOrange}
                containerStyle={style.containerCheckBox}
                checked={item.id == chooseFilter.id}
                onPress={() => {
                  setchooseFilter(item);
                  filter(item.id);
                  setOpenFilter(false);
                }}
              />
            </View>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  containerSearch: {
    backgroundColor: metrics.width,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: metrics.getHeightFromDP('2%'),
  },
  containerModal: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  containerCheckBox: {
    backgroundColor: colors.defaultWhite,
    borderWidth: 0,
    marginLeft: 0,
    marginBottom: 0,
    padding: 10,
  },
  inputContainer: {
    width: metrics.getWidthFromDP('91%'),
    height: metrics.getHeightFromDP('7%'),
    marginTop: metrics.getHeightFromDP('0.5%'),
    marginLeft: metrics.getWidthFromDP('2%'),
    padding: metrics.getHeightFromDP('1%'),
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: metrics.getWidthFromDP('3%'),
    borderColor: colors.defaultWhite,
    backgroundColor: colors.defaultWhite,
  },
  input: {
    fontSize: metrics.getWidthFromDP('3.5%'),
    color: colors.defaultBlack,
  },
  containerFilter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textFilter: {
    color: colors.burntSienna,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.getHeightFromDP('5%')
  },
});

const mapStateToProps = state => ({
  storeTransaction: state.transaction,
});

const mapDispatchToProps = dispatch => ({
  transactionActions: bindActionCreators(TransactionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);