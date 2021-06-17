import { Platform } from 'react-native'

export default function getPlatform() {
  const platform =
    Platform.OS == 'android' || Platform.OS == 'ios' ? 'Mobile' : 'Other'
  return platform
}
