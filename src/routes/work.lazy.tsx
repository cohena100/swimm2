import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/work')({
  component: () => <div>Hello /work!</div>
})