import React, { useEffect, useState } from 'react';
import StoryCircle from '../../Components/Story/StoryCircle';
import HomeRight from '../../Components/HomeRight/HomeRight';
import PostCard from '../../Components/Post/PostCard';
import CreatePostModal from '../../Components/Post/CreatePostModal';
import { stories } from '../../data/mockData';
import { useAuth } from '../../auth/AuthContext';
import { fetchFeed } from '../../api/postApi';
import { normalizePost } from '../../api/normalize';

const Homepage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    fetchFeed()
      .then((res) => {
        if (cancelled) return;
        const sorted = (res || [])
          .map(normalizePost)
          .sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        setPosts(sorted);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load feed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true };
  }, [currentUser]);

  if (!currentUser) return null;

  const myStory = {
    id: `story-${currentUser.id}`,
    userId: currentUser.id,
    username: currentUser.username,
    avatar: currentUser.avatar,
    hasUnseenStory: true,
  };

  return (
    <div>
      <div className='mt-10 flex justify-center'>
        <div className='flex gap-16'>
          <div className='w-[470px]'>
            <div className='storyDiv flex space-x-4 border p-4 rounded-md justify-start w-full overflow-x-auto hide-scrollbar'>
              <StoryCircle story={myStory} isYou />
              {stories.map((story) => <StoryCircle key={story.id} story={story} />)}
            </div>

            <div className='space-y-10 w-full mt-10'>
              {loading && <p className='text-sm opacity-60 text-center'>Loading feed...</p>}
              {error && <p className='text-sm text-red-500 text-center'>{error}</p>}
              {!loading && posts.length === 0 && !error && (
                <p className='text-sm opacity-60 text-center'>No posts yet. Follow some people or share your first post.</p>
              )}
              {posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </div>

          <div className='w-[320px] pt-2'>
            <HomeRight/>
          </div>
        </div>
      </div>
      <CreatePostModal />
    </div>
  )
}

export default Homepage;
