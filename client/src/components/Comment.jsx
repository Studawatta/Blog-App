import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Comment = ({ comment, onLike }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [comment])
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div>
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={` hover:text-blue-500 ${
              currentUser && comment.likes.includes(currentUser._id)
                ? 'text-blue-500'
                : 'text-gray-400'
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment
