import { getIsoCode } from '@/constants/teamMappings';

const SIZES = {
  xs: { container: 'w-7 h-7', border: 'border' },
  sm: { container: 'w-10 h-10', border: 'border' },
  md: { container: 'w-16 h-16', border: 'border-2' },
  lg: { container: 'w-24 h-24', border: 'border-2' },
  xl: { container: 'w-32 h-32', border: 'border-[3px]' },
};

export default function FlagCircle({ teamName, size = 'md', className = '' }) {
  const isoCode = getIsoCode(teamName);
  const { container, border } = SIZES[size] ?? SIZES.md;

  return (
    <div
      className={`${container} rounded-full overflow-hidden ${border} border-white/20 shadow-lg flex-shrink-0 bg-surface-3 ${className}`}
    >
      <span
        className={`fi fi-${isoCode}`}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        title={teamName}
      />
    </div>
  );
}
