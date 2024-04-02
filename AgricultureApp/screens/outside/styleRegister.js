import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6D38'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1, // Đặt zIndex thấp hơn để ảnh nền chìm sau
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  dangNhap: {
    fontSize: 25,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputArea: {
    // flex: 1,
    width: '100%',
    // backgroundColor: '#146030',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#E1A60B',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  haveAnAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  signinButton: {
    color: '#E1A60B'
  },
  chuaCoTaiKhoan: {
    color: '#fff'
  },

})

export default styles