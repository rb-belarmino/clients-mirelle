import { Code2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full py-2 text-center text-amber-900/70 text-xs sm:text-sm bg-white/80 backdrop-blur-md border-t border-amber-200 z-40">
      <div className="flex items-center justify-center gap-1.5">
        <Code2 size={14} className="text-amber-600" />
        <span>
          Desenvolvido por{' '}
          <a
            href="https://www.linkedin.com/in/rodrigo-belarmino/"
            title="Linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-700 hover:text-amber-900 transition-colors"
          >
            Rodrigo Belarmino
          </a>{' '}
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
