import BackButton from '../components/BackButton'
import UserList from '../components/UserList'

export default function UsersPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <UserList />
      <div className="flex justify-end mt-6">
        <BackButton />
      </div>
    </div>
  )
}
