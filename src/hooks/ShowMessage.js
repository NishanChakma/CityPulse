import Toast from 'react-native-root-toast';
import colors from '../utills/colors';

const ShowMessage = (text, error = false, color, opacity) => {
  return Toast.show(text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: error ? colors.primary : colors.inputColor,
    textColor: color ?? '#fff',
    opacity: opacity ?? 1,
  });
};

export default ShowMessage;
