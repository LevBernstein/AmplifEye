import p from 'platform-detect/os.mjs'
import { Platform } from 'react-native'

export default function getPlatform() {
  const platform =
    p.windows || p.linux || p.macos || p.linuxBased || p.chromeos
      ? 'Desktop'
      : p.android ||
        p.ios ||
        p.tizen ||
        Platform.OS == 'android' ||
        Platform.OS == 'ios'
      ? 'Mobile'
      : 'Other'
  return platform
}
