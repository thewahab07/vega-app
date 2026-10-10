import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {isTV} from '../../lib/tv';
import SettingsSection from './SettingsSection';
import Surface from './Surface';
import AppText from './Text';

// Row and section windowing keeps native controls outside the initial viewport
// out of the cold mount. TV retains a continuous tree for directional focus.
const SettingsPage = ({children}: {children: React.ReactNode}) => {
  const items = React.Children.toArray(children);
  if (isTV) {
    return (
      <ScrollView focusable={false} accessible={false}
        className="h-full w-full bg-m3-background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40, paddingTop: 20}}>
        <View style={{paddingHorizontal: 20}}>{items}</View>
      </ScrollView>
    );
  }
  const rows = items.flatMap<React.ReactNode>(item => {
    if (!React.isValidElement<{title: string; children: React.ReactNode}>(item) || item.type !== SettingsSection) return [item];
    const sectionRows = React.Children.toArray(item.props.children);
    return [
      <AppText key={String(item.key) + ':title'} role="labelLarge" className="mb-3 text-m3-on-surface-variant">{item.props.title}</AppText>,
      ...sectionRows.map((child, index) => (
        <Surface key={String(item.key) + ':row:' + index} level="low"
          style={{
            overflow: 'hidden',
            borderTopLeftRadius: index === 0 ? 28 : 0,
            borderTopRightRadius: index === 0 ? 28 : 0,
            borderBottomLeftRadius: index === sectionRows.length - 1 ? 28 : 0,
            borderBottomRightRadius: index === sectionRows.length - 1 ? 28 : 0,
            marginBottom: index === sectionRows.length - 1 ? 24 : 0,
          }}>{child}</Surface>
      )),
    ];
  });
  return (
    <FlatList
      className="flex-1 w-full bg-m3-background"
      data={rows}
      renderItem={({item}) => <>{item}</>}
      keyExtractor={(item, index) =>
        React.isValidElement(item) && item.key !== null ? String(item.key) : String(index)
      }
      initialNumToRender={6}
      maxToRenderPerBatch={2}
      updateCellsBatchingPeriod={50}
      windowSize={3}
      removeClippedSubviews={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 40, paddingTop: 20}}
    />
  );
};
export default SettingsPage;
