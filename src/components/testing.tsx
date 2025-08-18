interface UserProfileProps {
  name: string;
  role: string;
  level: string;
  artists: string[];
  genre: string;
  software: string;
  mood: string;
  location: string;
  availability: boolean;
  badges: string[];
  tags: string[];
  avatarUrl: string;
  premium?: boolean;
}

export default function UserProfile({
  name,
  role,
  level,
  artists,
  genre,
  software,
  mood,
  location,
  availability,
  badges,
  tags,
  avatarUrl,
  premium = false,
}: UserProfileProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 bg-base-200 p-6 rounded-2xl shadow-lg">
      {/* Left Card */}
      <div className="flex flex-col items-center text-center bg-base-300 p-6 rounded-xl">
        <img
          src={avatarUrl}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-base-100 shadow-md"
        />
        <h2 className="text-xl font-bold mt-4">{name}</h2>
        {premium && (
          <p className="text-sm text-green-400 font-medium">Premium User</p>
        )}
      </div>

      {/* Right Card */}
      <div className="bg-base-300 p-6 rounded-xl flex flex-col gap-3">
        <h3 className="font-semibold text-lg mb-2">Bio & other details</h3>

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <p className="text-gray-400">My Role</p>
          <p className="font-medium">{role}</p>

          <p className="text-gray-400">My Experience Level</p>
          <p className="font-medium">{level}</p>

          <p className="text-gray-400">My 3 Favorite Artists</p>
          <p className="font-medium">{artists.join(", ")}</p>

          <p className="text-gray-400">My Favorite Music Genre</p>
          <p className="font-medium">{genre}</p>

          <p className="text-gray-400">The Software I Use</p>
          <p className="font-medium">{software}</p>

          <p className="text-gray-400">Preferred Music Mood</p>
          <p className="font-medium">{mood}</p>

          <p className="text-gray-400">My City or Region</p>
          <p className="font-medium">{location}</p>

          <p className="text-gray-400">Availability</p>
          <p>
            {availability ? (
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                Available for Collaboration
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                Not Available
              </span>
            )}
          </p>
        </div>

        {/* Badges */}
        <div className="mt-3">
          <p className="text-gray-400 text-sm">Badges</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {badges.map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3">
          <p className="text-gray-400 text-sm">Tags</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-base-100/20 text-gray-300 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
