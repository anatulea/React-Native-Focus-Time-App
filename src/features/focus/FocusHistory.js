import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return <Text style={historyItemStyles(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> Things we've focused on </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const historyItemStyles = (status) => ({
  color: status > 1 ? 'red' : 'green',
  fontSize: fontSizes.md,
});

const styles = StyleSheet.create({
  clearContainer: {
    alignItems: 'center',
    padding: paddingSizes.md,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
});
