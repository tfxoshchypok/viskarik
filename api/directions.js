const up = 'Вверх'
const down = 'Вниз'
const north = 'Північ'
const west = 'Захід'
const east = 'Схід'
const south = 'Південь'


export const useDirections = () => {
  return {
    up,
    down,
    north,
    west,
    east,
    south,
    directions: [up, down, north, west, east, south]
  }
}
