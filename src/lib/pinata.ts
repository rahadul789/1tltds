import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataGateway: import.meta.env.NEXT_PUBLIC_GATEWAY_URL,
});
