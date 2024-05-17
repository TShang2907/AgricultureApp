import { StyleSheet } from 'react-native'
import { theme } from '../../../theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#157639'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1, // Đặt zIndex thấp hơn để ảnh nền chìm sau
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: '#146030',
    marginTop: 25,
    height: 50,
  },
  body: {
    marginBottom: 100,
  },
  menuIcon: {
    height: 30,
    width: 30,

  },
  menuIconArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theoDoiCayTrongArea: {
    flex: 6,
    justifyContent: 'center',

  },
  theoDoiCayTrong: {
    fontSize: 22,
    color: '#fff',
  },
  monitorLinechartBg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    width: 400,
    backgroundColor: 'transparent',//theme.bgWhite(0.15),
    borderRadius: 5
  },
  monitorLinechartBgArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  tempChart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nhietDo: {
    fontWeight: 'bold',
    color: '#fff'
  },
  soilArea: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 20,
  },
  nitrogenArea: {
    height: 110,
    width: 110,
    // borderColor: '#146030',
    // borderWidth: 7,
    backgroundColor: theme.bgWhite(0.25),
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photphorusArea: {
    height: 110,
    width: 110,
    // borderColor: '#146030',
    // borderWidth: 7,
    backgroundColor: theme.bgWhite(0.25),
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kaliArea: {
    height: 110,
    width: 110,
    // borderColor: '#146030',
    // borderWidth: 7,
    backgroundColor: theme.bgWhite(0.25),
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soilText: {
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#fff'
  },
  electricArea: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
  },
  elecConducArea: {
    height: 110,
    width: 110,
    // borderColor: '#146030',
    // borderWidth: 5,
    backgroundColor: theme.bgWhite(0.25),
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  potenHydroArea: {
    height: 110,
    width: 110,
    // borderColor: '#146030',
    // borderWidth: 5,
    backgroundColor: theme.bgWhite(0.25),
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageListArea: {
    flex: 11
  },
  pageListComponent: {
    height: 50,

    justifyContent: 'center',
    alignItems: 'center'
  },
  pageListText: {
    fontSize: 20,
    color: '#fff'
  },
  logoutArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles