export const pageAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
}

export const slideAnimation = {
  enter: (direction) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }
  },
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }
  },
}

export const captionAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
}

export const cardAnimation = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}