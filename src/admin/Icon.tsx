// Real Wright Way logo in place of Payload's default nav icon. Real bug,
// fixed: a fixed height + auto width on this 205x71 wordmark rendered
// ~69px wide inside Payload's small square icon slot, overflowing it.
// object-fit: contain scales it down to actually fit that square space
// instead of forcing its own aspect ratio into it.
export default function Icon() {
  return (
    <img
      src="/api/media/file/wright-way-logo.svg"
      alt="Wright Way"
      style={{ display: 'block', height: '100%', width: '100%', objectFit: 'contain' }}
    />
  )
}
