export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  coverUrl?: string
  audioUrl: string
  duration?: number
}

export interface Playlist {
  id: string
  title: string
  description?: string
  coverUrl?: string
  songIds: string[]
}
