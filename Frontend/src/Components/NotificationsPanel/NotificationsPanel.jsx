import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NotificationsPanel.css'
import { notifications, findUser } from '../../data/mockData'

const GROUP_LABELS = {
    new: 'New',
    today: 'Today',
    thisWeek: 'This Week',
    earlier: 'Earlier',
}

const NotificationRow = ({ notification }) => {
    const navigate = useNavigate()
    const user = findUser(notification.userId)
    const [following, setFollowing] = useState(false)

    const goToProfile = () => {
        if (user?.username) navigate(`/username/${user.username}`)
    }

    return (
        <div onClick={goToProfile} className='flex items-center px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer'>
            <img
                className='w-11 h-11 rounded-full object-cover shrink-0'
                src={user.avatar}
                alt={user.username}
            />
            <p className='ml-3 text-sm min-w-0 flex-1'>
                <span className='font-semibold'>{user.username}</span>{' '}
                <span>{notification.text}</span>{' '}
                <span className='opacity-50'>{notification.timeAgo}</span>
            </p>
            {notification.type === 'follow' ? (
                <button
                    onClick={(e) => { e.stopPropagation(); setFollowing(!following) }}
                    className={`ml-3 shrink-0 text-sm font-semibold px-3 py-1 rounded-md ${
                        following
                            ? 'bg-gray-100 hover:bg-gray-200 text-black'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    {following ? 'Following' : 'Follow'}
                </button>
            ) : notification.postImage ? (
                <img
                    className='ml-3 w-11 h-11 object-cover shrink-0'
                    src={notification.postImage}
                    alt=''
                />
            ) : null}
        </div>
    )
}

const NotificationsPanel = () => {
    const groups = ['new', 'today', 'thisWeek', 'earlier']
    const byGroup = groups.map(g => ({
        key: g,
        label: GROUP_LABELS[g],
        items: notifications.filter(n => n.group === g),
    }))

    return (
        <div className='notificationsContainer'>
            <div className='px-5 pb-5'>
                <h1 className='text-2xl font-semibold pt-1'>Notifications</h1>
            </div>
            <hr />
            <div className='py-3 px-2 overflow-y-auto'>
                {byGroup.map(group => (
                    group.items.length === 0 ? null : (
                        <div key={group.key} className='mb-4'>
                            <p className='px-3 text-sm font-semibold mb-1'>{group.label}</p>
                            {group.items.map(n => (
                                <NotificationRow key={n.id} notification={n} />
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default NotificationsPanel
