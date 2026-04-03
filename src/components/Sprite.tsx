import { useMemo } from 'react';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { View, type ViewProps } from 'tamagui';
import { SPRITES } from '~/assets/modules/sprite';

interface SpriteProps extends ViewProps {
  iconName: string | number;
  source: string;
  height?: number;
  width?: number;
}

export const Sprite: React.FC<SpriteProps> = ({ 
  iconName, 
  source,
  height = 32,
  width = 32,
  ...props
}) => {
  const spriteData = useMemo(() => {
    const sprite = SPRITES[source as keyof typeof SPRITES];
    if (!sprite) return null;
  
    const iconIndex = sprite.names.indexOf(iconName as never);
    if (iconIndex === -1) return null;

    const length = SPRITES[source as keyof typeof SPRITES].names.length;
    const rows = SPRITES[source as keyof typeof SPRITES].rows;
    const cols = Math.ceil(length / rows);
    const row = Math.floor(iconIndex / cols);
    const col = iconIndex % cols;

    return { row, col, rows, cols };
  }, [iconName, source]);

  if (!spriteData) return null;

  const styles = useMemo(() => StyleSheet.create({
    image: {
      width: width * spriteData.cols,
      height: height * spriteData.rows,
      marginLeft: -spriteData.col * width,
      marginTop: -spriteData.row * height,
    },
  }), [spriteData]);
  
  return (
    <View width={width} height={height} overflow='hidden' {...props} >
      <Image
        source={SPRITES[source as keyof typeof SPRITES].source}
        contentFit='contain'
        style={styles.image}
      />
    </View>
  );
};