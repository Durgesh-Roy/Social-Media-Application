import React, { useEffect, useRef } from 'react'

const EMOJIS = [
    '😀','😁','😂','🤣','😊','😍','😘','😎','🤩','🥳',
    '😢','😭','😡','🤔','😴','😬','🙄','😏','😇','🥰',
    '❤️','💔','💯','🔥','✨','🎉','🎂','🌹','☀️','🌙',
    '👍','👎','👏','🙏','💪','🙌','🤝','👋','✌️','🤞',
    '😅','😆','😋','😜','🤪','🤗','🤤','😴','🤒','🤧',
    '🐶','🐱','🐼','🦊','🐯','🦁','🐸','🐵','🐔','🦄',
    '🍕','🍔','🍟','🌮','🍣','🍩','🍪','🍦','☕','🍺',
    '⚽','🏀','🎮','🎵','🎬','📚','💻','📷','🚗','✈️',
]

const EmojiPicker = ({ open, onSelect, onClose, anchor = 'bottom-left' }) => {
    const ref = useRef(null)

    useEffect(() => {
        if (!open) return
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onClose?.()
        }
        document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [open, onClose])

    if (!open) return null

    const positionClass = {
        'bottom-left': 'bottom-full left-0 mb-2',
        'top-left': 'top-full left-0 mt-2',
    }[anchor] || 'bottom-full left-0 mb-2'

    return (
        <div
            ref={ref}
            className={`absolute ${positionClass} bg-white border rounded-lg shadow-lg p-2 z-50 w-[280px]`}
        >
            <div className='grid grid-cols-8 gap-1 max-h-56 overflow-y-auto'>
                {EMOJIS.map((e) => (
                    <button
                        key={e}
                        type='button'
                        onClick={() => onSelect?.(e)}
                        className='text-xl hover:bg-gray-100 rounded p-1 leading-none'
                    >
                        {e}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default EmojiPicker
