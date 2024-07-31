import Image from 'next/image'

const ProfileCard = ({ name, role, onPageChange, onLogout }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-full flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">{role}</p>
      </div>
      <div className="flex flex-col space-y-3 flex-grow">
        <button onClick={() => onPageChange('students')} className="bg-blue-500 text-white py-2 px-4 rounded">
          View Students
        </button>
        <button onClick={() => onPageChange('settings')} className="bg-gray-500 text-white py-2 px-4 rounded">
          Settings
        </button>
        <button onClick={() => onPageChange('billing')} className="bg-gray-500 text-white py-2 px-4 rounded">
          Do Billing
        </button>
        <button onClick={() => onPageChange('invite')} className="bg-gray-500 text-white py-2 px-4 rounded">
          Invite Students
        </button>
      </div>
      <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-6">
        Logout
      </button>
    </div>
  )
}

export default ProfileCard