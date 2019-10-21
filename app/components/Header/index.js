import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const HeaderSection = ({title}) => (
  <View style={styles.header}>
    <Text style={{fontWeight: 'bold', fontSize: 40, color: "#fff"}}>{title}</Text>
  </View>
);

export default HeaderSection;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    backgroundColor: '#0c4367',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width:"100%",
  },
});