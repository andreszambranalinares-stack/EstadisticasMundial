import FlagCircle from './FlagCircle';
import { getSpanishName } from '@/constants/teamMappings';

export default function TeamName({
  teamName,
  flagSize = 'sm',
  textSize = 'text-sm',
  className = '',
  align = 'left',
}) {
  const spanishName = getSpanishName(teamName);

  return (
    <div className={`flex items-center gap-2.5 ${align === 'right' ? 'flex-row-reverse' : ''} ${className}`}>
      <FlagCircle teamName={teamName} size={flagSize} />
      <span className={`${textSize} font-semibold text-white leading-tight`}>
        {spanishName}
      </span>
    </div>
  );
}
