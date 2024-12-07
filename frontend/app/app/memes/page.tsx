import React from "react";
import { Heart, MessageCircle } from "lucide-react";

const MemeFeed = () => {
  const memes = [
    {
      id: 1,
      imageUrl: "./meme-1.webp",
      likes: 1.2,
      comments: 45,
      creator: "memer1",
    },
    {
      id: 2,
      imageUrl: "/api/placeholder/400/400",
      likes: 2.4,
      comments: 32,
      creator: "memer2",
    },
    {
      id: 3,
      imageUrl: "/api/placeholder/400/400",
      likes: 3.1,
      comments: 56,
      creator: "memer3",
    },
    {
      id: 4,
      imageUrl: "/api/placeholder/400/400",
      likes: 0.8,
      comments: 21,
      creator: "memer4",
    },
    {
      id: 5,
      imageUrl: "/api/placeholder/400/400",
      likes: 5.2,
      comments: 89,
      creator: "memer5",
    },
    {
      id: 6,
      imageUrl: "/api/placeholder/400/400",
      likes: 1.7,
      comments: 34,
      creator: "memer6",
    },
  ];

  return (
    <div className="min-h-screen  bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">View memes</h2>

      <div className="grid grid-cols-3 gap-3 p-0.5">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="relative aspect-square group bg-card rounded-lg"
          >
            <img
              src={meme.imageUrl}
              alt={`Meme ${meme.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-primary-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{meme.likes}k</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{meme.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeFeed;
