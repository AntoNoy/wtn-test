import { MessageEntity } from "src/entities/message.entity";
import { ProfileEntity } from "src/entities/profile.entity";

/**
 * Fonction outil pour déterminer si l'user est l'émetteur
 */
export function asSender(
  profile: ProfileEntity,
  message: MessageEntity,
): boolean {
  return message.from.id === profile.id;
}

/**
 * Fonction outil pour déterminer si l'user est le receveur
 */
export function asReceiver(
  profile: ProfileEntity,
  message: MessageEntity,
): boolean {
  return message.to.id === profile.id;
}
