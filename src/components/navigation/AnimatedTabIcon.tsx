import React from 'react';
import Svg from 'react-native-svg';
import {FilledTabIcon} from './AnimatedTabIconParts';

export type AnimatedTabIconName =
  | 'home'
  | 'search'
  | 'watchlist'
  | 'download'
  | 'settings';

type AnimatedTabIconProps = {
  name: AnimatedTabIconName;
  active: boolean;
  color: string;
  size?: number;
};

// Keep the glyph visible during focus and navigation transitions. The rail
// supplies active/focus colors and its animated highlight; drawing an outline
// through idle work can otherwise leave both icon layers invisible on TV.
export function AnimatedTabIcon({name, color, size = 24}: AnimatedTabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <FilledTabIcon name={name} color={color} />
    </Svg>
  );
}
