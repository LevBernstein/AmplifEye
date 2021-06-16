import p from 'platform-detect/os.mjs'

export default function getPlatform() {
  const platform =
    p.windows || p.linux || p.macos || p.linuxBased || p.chromeos
      ? 'Desktop'
      : p.android || p.ios || p.tizen
      ? 'Mobile'
      : 'Other'
  return platform
}
