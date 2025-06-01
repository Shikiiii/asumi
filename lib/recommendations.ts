import type { Anime } from "@/types/anime"

// This is a mock implementation
// In a real app, you would call the MAL/Anilist APIs
export async function getRecommendations(provider?: string, access_token?: string, refresh_token?: string): Promise<Anime[]> {
  // use token to fetch information, depending on the provider
  // format is as the example data below

  // use api request to backend to fetch recommendations

  // Mock data with more examples
  return [
    {
      id: "1",
      title: "Fullmetal Alchemist: Brotherhood",
      type: "TV",
      episodes: 64,
      status: "Finished Airing",
      score: 9.1,
      genres: ["Action", "Adventure", "Drama", "Fantasy"],
      synopsis:
        "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx143200-42OaDCS6VEy3.png",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
      recommendationReason: "Based on your high ratings for action and fantasy anime",
      trailerUrl: "https://www.youtube.com/watch?v=--IcmZkvL0Q",
    },
    {
      id: "2",
      title: "Steins;Gate",
      type: "TV",
      episodes: 24,
      status: "Finished Airing",
      score: 9.0,
      genres: ["Sci-Fi", "Thriller", "Drama"],
      synopsis:
        "The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective 'future gadgets' with fellow lab members: Mayuri Shiina, his air-headed childhood friend, and Hashida Itaru, a perverted hacker nicknamed 'Daru.' The three pass the time by tinkering with their most promising contraption yet, a machine dubbed the 'Phone Microwave,' which performs the strange function of morphing bananas into piles of green gel.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdcVzQSkKxT.jpg",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/9253-Fz9vBDrZKAvQ.jpg",
      recommendationReason: "You enjoyed other sci-fi anime with complex plots",
      trailerUrl: "https://www.youtube.com/watch?v=uMYhjVwp0Fk",
    },
    {
      id: "3",
      title: "Attack on Titan",
      type: "TV",
      episodes: 75,
      status: "Finished Airing",
      score: 8.9,
      genres: ["Action", "Drama", "Fantasy", "Mystery"],
      synopsis:
        "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
      recommendationReason: "Based on your interest in dark fantasy and action series",
      trailerUrl: "https://www.youtube.com/watch?v=MGRm4IzK1SQ",
    },
    {
      id: "4",
      title: "Violet Evergarden",
      type: "TV",
      episodes: 13,
      status: "Finished Airing",
      score: 8.7,
      genres: ["Drama", "Fantasy", "Slice of Life"],
      synopsis:
        "The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines. Hospitalized and maimed in a bloody skirmish during the War's final leg, she was left with only words from the person she held dearest, but with no understanding of their meaning.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21827-10F6m50H4GJK.png",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21827-1yyb4cXvCjoQ.jpg",
      recommendationReason: "You might enjoy this emotional story with beautiful animation",
      trailerUrl: "https://www.youtube.com/watch?v=UZEOpfelkxQ",
    },
    {
      id: "5",
      title: "Demon Slayer",
      type: "TV",
      episodes: 26,
      status: "Finished Airing",
      score: 8.6,
      genres: ["Action", "Supernatural", "Historical"],
      synopsis:
        "Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
      recommendationReason: "Based on your high ratings for supernatural action series",
      trailerUrl: "https://www.youtube.com/watch?v=VQGCKyvzIM4",
    },
    {
      id: "6",
      title: "My Hero Academia",
      type: "TV",
      episodes: 113,
      status: "Ongoing",
      score: 8.2,
      genres: ["Action", "Adventure", "Comedy", "Superhero"],
      synopsis:
        "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk. After being the only one to try and save his childhood bully from a villain, Izuku is given a Quirk by the world's greatest Hero, All Might, and this chance to pursue his dream at U.A. High School, a school for heroes in training.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21856-UD7jnpIJNc7a.jpg",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21856-wtSHgeHFmLZX.jpg",
      recommendationReason: "You might enjoy this popular superhero anime with great action sequences",
      trailerUrl: "https://www.youtube.com/watch?v=EPVkcwyLQQ8",
    },
    {
      id: "7",
      title: "Jujutsu Kaisen",
      type: "TV",
      episodes: 24,
      status: "Finished Airing",
      score: 8.7,
      genres: ["Action", "Supernatural", "Horror"],
      synopsis:
        "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful jujutsu sorcerer, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAHww.jpg",
      recommendationReason: "Based on your interest in supernatural action series with dark themes",
      trailerUrl: "https://www.youtube.com/watch?v=4A_X-Dvl0ws",
    },
    {
      id: "8",
      title: "Spy x Family",
      type: "TV",
      episodes: 25,
      status: "Finished Airing",
      score: 8.6,
      genres: ["Action", "Comedy", "Slice of Life"],
      synopsis:
        "Everyone has a part of themselves they cannot show to anyone else. At a time when all nations of the world were involved in a fierce war of information happening behind closed doors, Ostania and Westalis had been in a state of cold war against one another for decades. The Westalis Intelligence Services' Eastern-Focused Division (WISE) sends their most talented spy, 'Twilight,' on a top-secret mission to investigate the movements of Donovan Desmond, who is heading up Ostania's National Unity Party and is a threat to peace between the two nations.",
      coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-vN39AmOWrVB5.jpg",
      bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-jQBSkxWAAHww.jpg",
      recommendationReason: "You might enjoy this popular blend of action, comedy and family dynamics",
      trailerUrl: "https://www.youtube.com/watch?v=ofXigq9aIpo",
    },
  ]
}
