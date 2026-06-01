import { memo, useMemo } from 'react';
import { Image, type ImageProps } from 'tamagui';
import { SvgUri, SvgXml } from 'react-native-svg';

export interface IconProps extends ImageProps {
  onError?: (error: any) => void;
  onLoad?: () => void;
  color?: string;
}

enum IconType {
  NetworkSvg = 'NetworkSvg',
  NetworkImage = 'NetworkImage',
  LocalSvg = 'LocalSvg',
  LocalImage = 'LocalImage',
}

/**
 * 智能图片组件
 * 根据传入的地址自动判断图片类型并使用合适的渲染方式
 */
export const Icon = memo<IconProps>(({
  src,
  onError,
  onLoad,
  color,
  ...props
}) => {
  const iconType = useMemo(() => {
    // 如果是 require() 导入的本地资源（number类型）
    if (Number.isFinite(src)) {
      return IconType.LocalImage
    }

    const srcStr = `${src}`;
    
    // 判断是否为网络图片
    const isNetwork = /^https?:\/\//i.test(srcStr);
    
    // 判断是否为SVG格式
    const isSvg = /\.svg(\?.*)?$/i.test(srcStr)
                || srcStr.includes('data:image/svg+xml')
                || srcStr.startsWith('<svg');
    
    // 确定图片类型
    if (isNetwork && isSvg) {
      return IconType.NetworkSvg;
    } else if (isNetwork && !isSvg) {
      return IconType.NetworkImage;
    } else if (!isNetwork && isSvg) {
      return IconType.LocalSvg;
    } else {
      return IconType.LocalImage;
    }
  }, [src]);

  // 网络SVG - 使用 SvgUri
  if (iconType === IconType.NetworkSvg) {
    return (
      <SvgUri
        uri={src}
        color={color}
        onError={onError}
        onLoad={onLoad}
        {...props as any}
      />
    );
  }

  // 本地SVG - 使用 SvgXml
  if (iconType === IconType.LocalSvg) {
    return (
      <SvgXml
        xml={src}
        color={color}
        onError={onError}
        {...props as any}
      />
    );
  }

  return (
    <Image
      src={src}
      color={color}
      onError={onError}
      onLoad={onLoad}
      {...props as any}
    />
  );
});

Icon.displayName = 'Icon';