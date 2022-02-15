type GameImage={
    
        id: number,
        score: number,
        style: string,
        width: number,
        height: number,
        nsfw: boolean,
        humor: boolean,
        notes: string,
        mime: string,
        language: string,
        url: string,
        thumb: string,
        lock: boolean,
        epilepsy: boolean,
        upvotes: number,
        downvotes: number,
        author: {
          name: string,
          steam64: string,
          avatar: string
        }
      
}