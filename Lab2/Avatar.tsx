type Props = {
    name: string
    phone: string
}

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Avatar = ({name, phone}: Props) => {
  return (
    <View>
      <Text>Avatar</Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({})