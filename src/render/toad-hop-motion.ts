export type ToadHopMotion = {
  routeProgress: number
  lift: number
  crouch: number
}

// 한 번의 도약에서 땅에 있는 몫이다. 이만큼은 앞으로 나아가지 않고 웅크린다.
// 이 멈춤이 없으면 위아래로 흔들리며 미끄러지는 것으로 보인다.
const CROUCH_SHARE = 0.34
const HOP_LIFT = 0.34
const CROUCH_DEPTH = 0.22

export function deriveToadHopMotion(
  routeProgress: number,
  hopCount: number,
): ToadHopMotion {
  const safeProgress = Math.max(0, Math.min(1, routeProgress))
  const safeHopCount = Math.max(1, Math.floor(hopCount))
  const stride = safeProgress * safeHopCount
  const landed = Math.floor(stride)
  const withinHop = stride - landed
  const airborne =
    withinHop <= CROUCH_SHARE
      ? 0
      : (withinHop - CROUCH_SHARE) / (1 - CROUCH_SHARE)

  return {
    routeProgress: Math.min(1, (landed + airborne) / safeHopCount),
    lift: Math.sin(airborne * Math.PI) * HOP_LIFT,
    crouch:
      airborne > 0
        ? 0
        : Math.sin((withinHop / CROUCH_SHARE) * Math.PI) * CROUCH_DEPTH,
  }
}
