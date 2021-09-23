import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const percentageCalculation = (max, val) => max * (val / 100);

const getWidthFromDP = widthPercentage => {
  const percentageDesired = parseFloat(widthPercentage);
  const widthPercentageToDP = PixelRatio.roundToNearestPixel(
    percentageCalculation(width, percentageDesired),
  );

  return widthPercentageToDP;
};

const getHeightFromDP = heightPercentage => {
  const percentageDesired = parseFloat(heightPercentage);
  const heightPercentageToDP = PixelRatio.roundToNearestPixel(
    percentageCalculation(height, percentageDesired),
  );

  return heightPercentageToDP;
};

export default {
  getWidthFromDP,
  getHeightFromDP,

  width,
  height,
};