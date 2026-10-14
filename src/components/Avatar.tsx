const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export default function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 ${
        size === 'sm' ? 'size-8 text-xs' : 'size-9 text-sm'
      }`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
