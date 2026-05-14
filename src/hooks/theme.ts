import { useTheme, useThemeName } from 'tamagui';

/** Resolve color from theme */
export const useResolveColor = (color: string) => {
  useThemeName(); // subscription to theme name
  const theme = useTheme();
  
  if (color?.startsWith('$')) {
    const tokenName = color.slice(1);
    return theme[tokenName]?.get()|| color;
  }
  
  return color;
};