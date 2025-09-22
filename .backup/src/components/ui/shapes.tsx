import { cn } from '@/lib/utils'

type ShapeProps = {
	className?: string
	color: 'blue' | 'green' | 'yellow'
	variant?: 'default' | 'variant1' | 'variant2' | 'variant3'
}

const colorClasses: Record<string, string> = {
	blue: 'bg-blue-500 from-blue-400 to-blue-600',
	green: 'bg-green-500 from-green-400 to-green-600',
	yellow: 'bg-yellow-500 from-yellow-400 to-yellow-600',
}

const variantClasses: Record<string, string> = {
	default: 'rounded-[50%_50%_70%_30%/50%_50%_30%_70%]',
	variant1: 'rounded-[60%_40%_50%_50%/40%_60%_50%_50%]',
	variant2: 'rounded-[70%_30%_60%_40%/30%_70%_40%_60%]',
	variant3: 'rounded-[40%_60%_30%_70%/60%_40%_70%_30%]',
}

export const Shape = ({
	className = '',
	color,
	variant = 'default',
}: ShapeProps) => {
	return (
		<div
			className={cn(
				'absolute opacity-80 z-0 shadow-md',
				'[background:linear-gradient(145deg,var(--tw-gradient-from),var(--tw-gradient-to))]',
				colorClasses[color],
				variantClasses[variant],
				className,
			)}
		/>
	)
}
