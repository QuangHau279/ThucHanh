import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';
import colors from '../utility/colors';
interface DetailListItemProps {
    icon?: string;
    title: string;
    subtitle?: string;
}

const DetailListItem:React.FC<DetailListItemProps> = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {icon && <Icon name={icon} size={24} style={styles.icon} />}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

// DetailListItem.propTypes = {
//   icon: PropTypes.string,
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
// };

const styles = StyleSheet.create({
  borderContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  wrapper: {
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  contentContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  icon: {
    color: colors.icon,
  },
});

export default DetailListItem;