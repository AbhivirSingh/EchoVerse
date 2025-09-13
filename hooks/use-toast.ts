import { useCallback } from "react"

export function useToast() {
  // Placeholder: implement your toast logic here
  const toast = useCallback((message: string) => {
    alert(message)
  }, [])

  return { toast }
}
