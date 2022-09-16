import OneSignalReact from "react-onesignal";

export default async function runOneSignal() {
  await OneSignalReact.init({ appId: '9113e602-24c9-47e1-b77f-1582ae760a00', allowLocalhostAsSecureOrigin: true});
}