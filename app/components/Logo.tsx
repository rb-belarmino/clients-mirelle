import Image from 'next/image'

export default function Logo({
  className = '',
  size = 180
}: {
  className?: string
  size?: number
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/img/logo.jpeg"
        alt="Logo"
        width={size}
        height={size}
        className="rounded-full shadow-lg border-4 border-amber-200 bg-white"
        priority
      />
    </div>
  )
}
