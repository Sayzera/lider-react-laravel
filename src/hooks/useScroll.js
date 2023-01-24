import React from 'react'

function useScroll() {
  const elref = React.useRef(null)
  const executeScroll = () =>
    elref?.current?.scrollIntoView({ behavior: 'auto' /*or smooth*/, block: 'center' })

  return [executeScroll, elref]
}

export default useScroll
