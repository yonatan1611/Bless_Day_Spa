export const Skeleton = ({ width, height = '1rem', className = '' }: { width: string; height?: string; className?: string }) => (
  <span className={`adm-skel ${className}`} style={{ display: 'inline-block', width, height }} aria-hidden="true" />
)

export const StatSkeleton = () => (
  <div className="adm-stat">
    <Skeleton width="4rem" height="0.7rem" />
    <div style={{ marginTop: '0.5rem' }}>
      <Skeleton width="3.5rem" height="1.75rem" />
    </div>
  </div>
)

export const TableRowSkeleton = ({ columns = 4 }: { columns?: number }) => (
  <tr>
    {Array.from({ length: columns }, (_, i) => (
      <td key={i}><Skeleton width={i === 0 ? '60%' : '40%'} /></td>
    ))}
  </tr>
)
