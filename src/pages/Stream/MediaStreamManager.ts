// MediaStreamManager.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getMediaStream(deviceId?: string): Promise<MediaStream> {
  const constraints: MediaStreamConstraints = {
    video: true,
    audio: true,
  };

  // if (deviceId) {
  //   constraints.video = { deviceId: { exact: deviceId } };
  //   constraints.audio = { deviceId: { exact: deviceId } };
  // }

  return navigator.mediaDevices.getUserMedia(constraints);
}

export async function getMediaDevices(): Promise<MediaDeviceInfo[]> {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices.filter(
    (device) => device.kind === 'videoinput' || device.kind === 'audioinput',
  );
}
