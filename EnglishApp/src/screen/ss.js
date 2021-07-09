if (password.length <=8){
    Alert.alert('Thông báo', 'Mật khẩu phải lớn hơn 8 kí tự!');
    return;
  }
  if (password.length >=30){
    Alert.alert('Thông báo', 'Mật khẩu phải nhỏ hơn 30 kí tự!');
    return;
  }