import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = ({ title }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: 60 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
      <TouchableOpacity onPress={handleLogout}>
      <Icon name="sign-out" size={30} color="#4682b4" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
