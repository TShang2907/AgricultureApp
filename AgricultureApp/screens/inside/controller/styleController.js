import { StyleSheet } from 'react-native'
import { theme } from '../../../theme/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F1F1F1'
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
  menuIcon: {
    height: 40,
    width: 40,
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
    color: '#fff'
  },
  monitorLinechartBg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    width: 330,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  monitorLinechartBgArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  tempChart: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nhietDo: {
    fontWeight: 'bold'
  },
  soilArea: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 20,
  },
  nitrogenArea: {
    height: 110,
    width: 110,
    borderColor: '#fff',
    borderWidth: 7,
    backgroundColor: '#A8FAF4',
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photphorusArea: {
    height: 110,
    width: 110,
    borderColor: '#fff',
    borderWidth: 7,
    backgroundColor: '#a5d2f5',
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kaliArea: {
    height: 110,
    width: 110,
    borderColor: '#fff',
    borderWidth: 7,
    backgroundColor: '#a2aaf5',
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soilText: {
    marginVertical: 5,
    fontWeight: 'bold'
  },
  electricArea: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
  },
  elecConducArea: {
    height: 110,
    width: 170,
    borderColor: '#fff',
    borderWidth: 5,
    backgroundColor: '#bccdf8',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  potenHydroArea: {
    height: 110,
    width: 170,
    borderColor: '#fff',
    borderWidth: 5,
    backgroundColor: '#a1e3d9',
    borderRadius: 20,
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
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonAreaRow1: {
    flexDirection: 'row'
  },
  buttonText: {
    color: '#fff',
    margin: 10
  },
  switch1: {
    height: 100,
    width: 150,
    backgroundColor: theme.bgWhite(0.15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 10
  },
  buttonAreaRow2: {
    flexDirection: 'row'
  },
  buttonAreaRow3: {
    flexDirection: 'row',
    marginTop: 20
  },
  buttonAreaRow4: {
    flexDirection: 'row'
  },
  buttonAreaRow5: {
    flexDirection: 'row',
    marginTop: 20
  },
  dungDichText: {
    color: '#fff',
    fontSize: 30
  },
  iconAndText: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles