// Centralized mock data for the Instagram-like UI.
// Replace these with real API responses when the backend is wired up.

export const currentUser = {
    id: "u-self",
    username: "durgesh.dev",
    fullName: "Durgesh Roy",
    bio: "Code, Coffee, and Chill. Software Developer.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&h=256&fit=crop&auto=format",
    posts: 12,
    followers: 248,
    following: 196,
    hasUnseenStory: true,
};

export const users = [
    { id: "u1", username: "alex.river",    fullName: "Alex Rivera",   avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop&auto=format", relation: "Follows you", hasUnseenStory: true  },
    { id: "u2", username: "maya.codes",    fullName: "Maya Chen",      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format", relation: "Suggested for you", hasUnseenStory: true  },
    { id: "u3", username: "leo.travels",   fullName: "Leo Park",       avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&auto=format", relation: "Followed by maya.codes", hasUnseenStory: false },
    { id: "u4", username: "sara.kim",      fullName: "Sara Kim",       avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256&fit=crop&auto=format", relation: "New to Instagram",     hasUnseenStory: true  },
    { id: "u5", username: "jay.makes",     fullName: "Jay Patel",      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=256&h=256&fit=crop&auto=format", relation: "Follows you", hasUnseenStory: true  },
    { id: "u6", username: "nina.art",      fullName: "Nina Alvarez",   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format", relation: "Suggested for you", hasUnseenStory: false },
    { id: "u7", username: "ravi.frames",   fullName: "Ravi Sharma",    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&auto=format", relation: "Followed by leo.travels", hasUnseenStory: true  },
    { id: "u8", username: "ella.bakes",    fullName: "Ella Brown",     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&auto=format", relation: "New to Instagram",  hasUnseenStory: false },
];

export const findUser = (id) => users.find(u => u.id === id) || users[0];

export const posts = [
    {
        id: "p1",
        userId: "u1",
        location: "Lisbon, Portugal",
        image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1080&auto=format&fit=crop",
        caption: "Golden hour wandering through the alfama streets ✨",
        likes: 1284,
        commentCount: 42,
        timeAgo: "2 hours ago",
    },
    {
        id: "p2",
        userId: "u2",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1080&auto=format&fit=crop",
        caption: "Late-night debugging fuel ☕️ #devlife",
        likes: 562,
        commentCount: 18,
        timeAgo: "5 hours ago",
    },
    {
        id: "p3",
        userId: "u5",
        location: "Banff National Park",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&auto=format&fit=crop",
        caption: "Mountains will always have my heart 🏔️",
        likes: 3120,
        commentCount: 87,
        timeAgo: "1 day ago",
    },
    {
        id: "p4",
        userId: "u4",
        location: "Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1080&auto=format&fit=crop",
        caption: "Shibuya never sleeps 🌃",
        likes: 845,
        commentCount: 31,
        timeAgo: "2 days ago",
    },
    {
        id: "p5",
        userId: "u6",
        location: "Studio",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1080&auto=format&fit=crop",
        caption: "New piece on the easel — figuring out the light 🎨",
        likes: 412,
        commentCount: 9,
        timeAgo: "3 days ago",
    },
];

export const findPost = (id) => posts.find(p => p.id === id) || posts[0];

// Stories for the home feed (first one is always current user).
export const stories = users
    .filter(u => u.hasUnseenStory)
    .map(u => ({
        id: `story-${u.id}`,
        userId: u.id,
        username: u.username,
        avatar: u.avatar,
        hasUnseenStory: true,
    }));

// Frames shown when a story is opened.
export const storyFrames = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&auto=format",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&auto=format",
];

// Per-user story reels for the story viewer.
export const usersWithStories = [
    ...(currentUser.hasUnseenStory ? [{
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        postedAgo: '1h',
        frames: storyFrames.slice(0, 2).map((url, i) => ({ id: `${currentUser.id}-f${i}`, image: url })),
    }] : []),
    ...users.filter(u => u.hasUnseenStory).map((u, idx) => ({
        userId: u.id,
        username: u.username,
        avatar: u.avatar,
        postedAgo: `${(idx + 2)}h`,
        frames: storyFrames
            .slice(0, 2 + (idx % 3))
            .map((url, i) => ({ id: `${u.id}-f${i}`, image: url })),
    })),
];

export const profilePosts = [
    "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=600&auto=format&fit=crop",
].map((image, idx) => ({ id: `pp${idx}`, image, likes: 50 + idx * 23, comments: 5 + idx * 2 }));

export const commentsByPost = {
    p1: [
        { id: "c1", userId: "u2", text: "This is unreal 😍", timeAgo: "1h", likes: 8 },
        { id: "c2", userId: "u3", text: "Adding to my bucket list right now", timeAgo: "45m", likes: 2 },
        { id: "c3", userId: "u4", text: "The light here is perfect", timeAgo: "20m", likes: 0 },
    ],
    p2: [
        { id: "c4", userId: "u5", text: "Same energy here", timeAgo: "3h", likes: 4 },
        { id: "c5", userId: "u1", text: "What stack are you working on?", timeAgo: "2h", likes: 1 },
    ],
    p3: [
        { id: "c6", userId: "u6", text: "Frame-worthy 🤩", timeAgo: "20h", likes: 12 },
        { id: "c7", userId: "u7", text: "Banff in fall hits different", timeAgo: "18h", likes: 3 },
    ],
    p4: [
        { id: "c8", userId: "u2", text: "Take me back!", timeAgo: "1d", likes: 7 },
    ],
    p5: [
        { id: "c9", userId: "u4", text: "Your color work keeps getting better", timeAgo: "2d", likes: 5 },
    ],
};

export const getComments = (postId) => commentsByPost[postId] || [];

export const conversations = [
    { id: "conv-u1", userId: "u1", lastMessage: "See you in Lisbon next month!", timeAgo: "5m",  unread: true,  online: true  },
    { id: "conv-u2", userId: "u2", lastMessage: "Sent that PR your way 👀",       timeAgo: "1h",  unread: false, online: true  },
    { id: "conv-u3", userId: "u3", lastMessage: "📷 Sent a photo",                 timeAgo: "3h",  unread: false, online: false },
    { id: "conv-u4", userId: "u4", lastMessage: "haha yeah definitely",            timeAgo: "1d",  unread: false, online: false },
    { id: "conv-u5", userId: "u5", lastMessage: "You: thanks man",                 timeAgo: "2d",  unread: false, online: true  },
    { id: "conv-u6", userId: "u6", lastMessage: "Let's catch up soon",             timeAgo: "1w",  unread: false, online: false },
];

export const messagesByConversation = {
    "conv-u1": [
        { id: "m1", fromMe: false, text: "yo are you around this weekend?",   timeAgo: "10m" },
        { id: "m2", fromMe: true,  text: "yeah! free saturday after 4",       timeAgo: "9m"  },
        { id: "m3", fromMe: false, text: "let's grab coffee then",            timeAgo: "8m"  },
        { id: "m4", fromMe: true,  text: "sounds good. that place by the river?", timeAgo: "7m" },
        { id: "m5", fromMe: false, text: "perfect 👌",                         timeAgo: "6m"  },
        { id: "m6", fromMe: false, text: "See you in Lisbon next month!",     timeAgo: "5m"  },
    ],
    "conv-u2": [
        { id: "m7",  fromMe: true,  text: "did you get a chance to look at the diff?", timeAgo: "2h" },
        { id: "m8",  fromMe: false, text: "yep almost done — couple of nits",          timeAgo: "1h" },
        { id: "m9",  fromMe: false, text: "Sent that PR your way 👀",                   timeAgo: "1h" },
    ],
    "conv-u3": [
        { id: "m10", fromMe: false, text: "📷 Sent a photo", timeAgo: "3h" },
    ],
    "conv-u4": [
        { id: "m11", fromMe: true,  text: "ready for tokyo??",      timeAgo: "1d" },
        { id: "m12", fromMe: false, text: "haha yeah definitely",   timeAgo: "1d" },
    ],
    "conv-u5": [
        { id: "m13", fromMe: false, text: "shot was 🔥",   timeAgo: "2d" },
        { id: "m14", fromMe: true,  text: "thanks man",   timeAgo: "2d" },
    ],
    "conv-u6": [
        { id: "m15", fromMe: false, text: "Let's catch up soon", timeAgo: "1w" },
    ],
};

export const getMessages = (convId) => messagesByConversation[convId] || [];

// type: 'like' | 'follow' | 'comment' | 'mention'
// group: 'new' | 'today' | 'thisWeek' | 'earlier'
export const notifications = [
    { id: "n1",  userId: "u1", type: "like",    text: "liked your photo.",                                  timeAgo: "2m",  postImage: posts[0].image, group: "new"      },
    { id: "n2",  userId: "u2", type: "follow",  text: "started following you.",                             timeAgo: "15m", group: "new"      },
    { id: "n3",  userId: "u4", type: "comment", text: 'commented: "The light here is perfect"',             timeAgo: "20m", postImage: posts[0].image, group: "new"      },
    { id: "n4",  userId: "u5", type: "like",    text: "and 12 others liked your photo.",                    timeAgo: "5h",  postImage: posts[2].image, group: "today"    },
    { id: "n5",  userId: "u3", type: "mention", text: "mentioned you in a comment.",                        timeAgo: "8h",  postImage: posts[1].image, group: "today"    },
    { id: "n6",  userId: "u6", type: "follow",  text: "started following you.",                             timeAgo: "1d",  group: "today"    },
    { id: "n7",  userId: "u7", type: "like",    text: "liked your photo.",                                  timeAgo: "3d",  postImage: posts[3].image, group: "thisWeek" },
    { id: "n8",  userId: "u2", type: "comment", text: 'commented: "What stack are you working on?"',        timeAgo: "4d",  postImage: posts[1].image, group: "thisWeek" },
    { id: "n9",  userId: "u8", type: "follow",  text: "started following you.",                             timeAgo: "6d",  group: "thisWeek" },
    { id: "n10", userId: "u1", type: "like",    text: "liked 3 of your photos.",                            timeAgo: "2w",  postImage: posts[0].image, group: "earlier"  },
    { id: "n11", userId: "u5", type: "follow",  text: "started following you.",                             timeAgo: "1mo", group: "earlier"  },
];