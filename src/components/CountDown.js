import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { fontSizes, paddingSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        // do more stuff here
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      // report progress
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [milis, setMilis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(milis / 1000 / 60) % 60;
  const seconds = Math.floor(milis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    paddingTop: paddingSizes.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
