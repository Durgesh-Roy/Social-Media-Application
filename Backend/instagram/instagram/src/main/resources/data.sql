-- ============================================================================
-- Seed data for the instagram database.
--
-- Loaded by Spring Boot at startup. Requires (set in application.properties):
--   spring.sql.init.mode=always
--   spring.jpa.defer-datasource-initialization=true   <- runs AFTER Hibernate
--                                                       creates the schema
--
-- LOGIN passwords below are written in PLAINTEXT. A startup hook
-- (DataSeeder.java) walks the users table after this script runs and
-- bcrypt-encodes any password that isn't already hashed. So you can
-- freely write any plaintext password here and log in with it.
--
-- All INSERTs use INSERT IGNORE so re-running the script is safe — existing
-- rows are skipped. IDs start at 100 to avoid colliding with accounts you
-- created manually via /signup.
--
-- If the follow-relationship INSERTs fail because the table name differs,
-- check `SHOW TABLES;` in MySQL — Hibernate may have named them
-- `users_follower` / `users_following` instead of `user_follower` /
-- `user_following` depending on naming-strategy. Update the names below
-- to match.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Users
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO users (id, user_name, name, email, password, image, bio, mobile, website, gender) VALUES
    (101, 'alex.river',  'Alex Rivera',  'alex.river@demo.com',  'password', 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop&auto=format', 'Photographer wandering through old towns.',          NULL, NULL, 'male'),
    (102, 'maya.codes',  'Maya Chen',    'maya.codes@demo.com',  '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format', 'Frontend dev. Coffee. Side projects.',                NULL, NULL, 'female'),
    (103, 'leo.travels', 'Leo Park',     'leo.travels@demo.com', 'Durgesh@1234', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&auto=format', 'Slow travel + film cameras.',                          NULL, NULL, 'male'),
    (104, 'sara.kim',    'Sara Kim',     'sara.kim@demo.com',    '1234567890', 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256&fit=crop&auto=format', 'Books, color, late-night ramen.',                      NULL, NULL, 'female'),
    (105, 'jay.makes',   'Jay Patel',    'jay.makes@demo.com',   '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=256&h=256&fit=crop&auto=format', 'Climbing routes and design systems.',                  NULL, NULL, 'male'),
    (106, 'nina.art',    'Nina Alvarez', 'nina.art@demo.com',    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format', 'Painter. Color obsessive.',                            NULL, NULL, 'female');

-- ----------------------------------------------------------------------------
-- Posts
-- Embedded UserDto columns:
--   user_id, user_email (overridden via @AttributeOverride)
--   username, name, user_image (default snake_case from UserDto fields)
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO posts (id, caption, image, location, created_at, user_id, user_email, username, name, user_image) VALUES
    -- alex.river (101) — 3 posts
    (1001, 'Golden hour wandering through the alfama streets.',  'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1080&auto=format&fit=crop', 'Lisbon, Portugal',     NOW(), 101, 'alex.river@demo.com',  'alex.river',  'Alex Rivera',  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop&auto=format'),
    (1008, 'Rooftop espresso, blue sky.',                          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1080&auto=format&fit=crop', 'Lisbon, Portugal',     NOW(), 101, 'alex.river@demo.com',  'alex.river',  'Alex Rivera',  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop&auto=format'),
    (1009, 'Old town textures.',                                   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1080&auto=format&fit=crop', 'Paris, France',        NOW(), 101, 'alex.river@demo.com',  'alex.river',  'Alex Rivera',  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop&auto=format'),

    -- maya.codes (102) — 3 posts
    (1002, 'Late-night debugging fuel. #devlife',                 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1080&auto=format&fit=crop', 'San Francisco, CA',    NOW(), 102, 'maya.codes@demo.com',  'maya.codes',  'Maya Chen',     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format'),
    (1007, 'Lab notebook morning.',                               'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop', 'Home office',          NOW(), 102, 'maya.codes@demo.com',  'maya.codes',  'Maya Chen',     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format'),
    (1010, 'Refactor friday.',                                     'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1080&auto=format&fit=crop', 'San Francisco, CA',    NOW(), 102, 'maya.codes@demo.com',  'maya.codes',  'Maya Chen',     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format'),

    -- leo.travels (103) — 2 posts
    (1006, 'Tea on a wet afternoon.',                             'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=1080&auto=format&fit=crop', 'Kyoto, Japan',         NOW(), 103, 'leo.travels@demo.com', 'leo.travels', 'Leo Park',      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&auto=format'),
    (1011, 'Bamboo grove, no filter.',                             'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1080&auto=format&fit=crop', 'Arashiyama, Japan',    NOW(), 103, 'leo.travels@demo.com', 'leo.travels', 'Leo Park',      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&auto=format'),

    -- sara.kim (104) — 2 posts
    (1004, 'Shibuya never sleeps.',                               'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1080&auto=format&fit=crop', 'Tokyo, Japan',         NOW(), 104, 'sara.kim@demo.com',    'sara.kim',    'Sara Kim',      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256&fit=crop&auto=format'),
    (1012, 'Slow morning.',                                        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1080&auto=format&fit=crop', 'Brooklyn, NY',         NOW(), 104, 'sara.kim@demo.com',    'sara.kim',    'Sara Kim',      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256&fit=crop&auto=format'),

    -- jay.makes (105) — 2 posts
    (1003, 'Mountains will always have my heart.',                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&auto=format&fit=crop', 'Banff National Park',  NOW(), 105, 'jay.makes@demo.com',   'jay.makes',   'Jay Patel',     'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=256&h=256&fit=crop&auto=format'),
    (1013, 'Bouldering before brunch.',                            'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1080&auto=format&fit=crop', 'Squamish, BC',         NOW(), 105, 'jay.makes@demo.com',   'jay.makes',   'Jay Patel',     'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=256&h=256&fit=crop&auto=format'),

    -- nina.art (106) — 2 posts
    (1005, 'New piece on the easel — figuring out the light.',    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1080&auto=format&fit=crop', 'Studio',               NOW(), 106, 'nina.art@demo.com',    'nina.art',    'Nina Alvarez',  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format'),
    (1014, 'Color study.',                                         'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=1080&auto=format&fit=crop', 'Studio',               NOW(), 106, 'nina.art@demo.com',    'nina.art',    'Nina Alvarez',  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format');

-- ----------------------------------------------------------------------------
-- Follow relationships
-- Hibernate creates two @ElementCollection tables for User.follower and
-- User.following. The expected default names are `user_follower` and
-- `user_following` with columns (user_id, follower) and (user_id, following).
--
-- If your DB names them `users_follower` / `users_following` instead, edit
-- the table names below.
-- ----------------------------------------------------------------------------
-- Dense follow graph so every seeded user sees plenty of posts in their feed.
-- (user_id follows `following`): the user_id user is following the `following` user.
INSERT IGNORE INTO user_following (user_id, following) VALUES
    (101, 102), (101, 103), (101, 104), (101, 105), (101, 106),
    (102, 101), (102, 103), (102, 104), (102, 105),
    (103, 101), (103, 102), (103, 106),
    (104, 101), (104, 102), (104, 105),
    (105, 101), (105, 103), (105, 106),
    (106, 101), (106, 103), (106, 104);

-- Mirror in user_follower so the "followers" count and lookups stay consistent.
INSERT IGNORE INTO user_follower (user_id, follower) VALUES
    (102, 101), (103, 101), (104, 101), (105, 101), (106, 101),
    (101, 102), (103, 102), (104, 102), (105, 102),
    (101, 103), (102, 103), (106, 103),
    (101, 104), (102, 104), (105, 104),
    (101, 105), (103, 105), (106, 105),
    (101, 106), (103, 106), (104, 106);

-- ----------------------------------------------------------------------------
-- Make YOUR signed-up account follow the seeded users so its feed is populated.
-- Default assumes your user_roy account has id = 1 (the first signup).
-- If your id is different, run:
--   SELECT id, email FROM users WHERE email NOT LIKE '%@demo.com';
-- and replace `1` below with that id.
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO user_following (user_id, following) VALUES
    (1, 101), (1, 102), (1, 103), (1, 104), (1, 105), (1, 106);

INSERT IGNORE INTO user_follower (user_id, follower) VALUES
    (101, 1), (102, 1), (103, 1), (104, 1), (105, 1), (106, 1);

-- ----------------------------------------------------------------------------
-- Comments
-- Embedded UserDto columns mirror those on posts.
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO comments (id, content, created_at, user_id, user_email, username, name, user_image) VALUES
    (2001, 'This is unreal.',                              NOW(), 102, 'maya.codes@demo.com', 'maya.codes', 'Maya Chen',    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format'),
    (2002, 'Adding to my bucket list right now.',          NOW(), 103, 'leo.travels@demo.com','leo.travels','Leo Park',     'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&auto=format'),
    (2003, 'Same energy here.',                            NOW(), 105, 'abcd@gmail.com',  'abcd',  'abcd',    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=256&h=256&fit=crop&auto=format'),
    (2004, 'What stack are you working on?',               NOW(), 101, 'alex.river@demo.com', 'alex.river', 'Alex Rivera',  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop&auto=format'),
    (2005, 'Frame-worthy.',                                NOW(), 106, 'nina.art@demo.com',   'nina.art',   'Nina Alvarez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format'),
    (2006, 'Take me back!',                                NOW(), 102, 'maya.codes@demo.com', 'maya.codes', 'Maya Chen',    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&auto=format');

-- ----------------------------------------------------------------------------
-- Link comments to posts (Post.comments @OneToMany join table)
-- Default Hibernate name: `posts_comments` with columns `post_id` and
-- `comments_id`. If your DB uses different names, adjust accordingly
-- (check with `SHOW TABLES;`).
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO posts_comments (post_id, comments_id) VALUES
    (1001, 2001),
    (1001, 2002),
    (1002, 2003),
    (1002, 2004),
    (1003, 2005),
    (1004, 2006);
