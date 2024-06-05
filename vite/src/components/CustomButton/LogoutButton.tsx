import { Button } from '@/components/ui/button'
import { useLogout } from '@/pages/Auth/hooks/useLogout'
import { LogOut } from 'lucide-react'
// import { useSignOut } from '../model/use-sign-out'

export function LogoutButton() {
  const { logout, isPending } = useLogout()
  return (
    <Button variant={'default'} disabled={isPending} onClick={() => logout()}>
      <LogOut />
    </Button>
  )
}
