import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 p-6">
        <h1 className="text-4xl font-bold text-[var(--color-foreground)]">
          Vite + React + Tailwind
        </h1>
        <div className="space-y-4">
          <Button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full"
          >
            count is {count}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button variant="destructive" size="sm">
              Destructive
            </Button>
          </div>
        </div>
        <p className="text-[var(--color-muted-foreground)]">
          Shadcn UI와 Tailwind CSS가 성공적으로 설정되었습니다!
        </p>
      </div>
    </div>
  )
}

export default App
