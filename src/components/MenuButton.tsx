type MenuButtonProps = { expanded: boolean; onClick: () => void }

export function MenuButton({ expanded, onClick }: MenuButtonProps) {
  return (
    <button className="menu-button" type="button" aria-expanded={expanded} aria-controls="main-navigation" onClick={onClick}>
      <span className="sr-only">{expanded ? 'Close navigation' : 'Open navigation'}</span>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  )
}
