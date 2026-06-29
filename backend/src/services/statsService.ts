import * as statsRepository from "../repositories/statsRepository";

export async function getStats(userId: string) {
  return statsRepository.getStats(userId);
}
