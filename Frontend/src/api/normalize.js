// Adapters between backend (Spring Boot) shapes and what the frontend renders.

export const normalizeUser = (u) => {
    if (!u) return null
    return {
        ...u,
        username: u.userName ?? u.username ?? '',
        fullName: u.name ?? u.fullName ?? '',
        avatar: u.image ?? u.avatar ?? '',
        bio: u.bio ?? '',
        followers: Array.isArray(u.follower) ? u.follower.length : (u.followers ?? 0),
        following: Array.isArray(u.following) ? u.following.length : (u.following ?? 0),
        followingIds: Array.isArray(u.following) ? u.following : [],
        followerIds: Array.isArray(u.follower) ? u.follower : [],
    }
}

export const normalizePost = (p) => {
    if (!p) return null
    const author = p.user
        ? {
              id: p.user.id,
              username: p.user.username ?? p.user.userName ?? '',
              fullName: p.user.name ?? '',
              avatar: p.user.userImage ?? p.user.image ?? '',
          }
        : null
    return {
        ...p,
        id: p.id,
        image: p.image,
        caption: p.caption,
        location: p.location,
        author,
        likes: p.likedByUsers?.length ?? 0,
        commentCount: p.comments?.length ?? 0,
        likedByUserIds: (p.likedByUsers || []).map(u => u.id),
        comments: p.comments || [],
        timeAgo: p.createdAt ? new Date(p.createdAt).toLocaleString() : '',
    }
}
