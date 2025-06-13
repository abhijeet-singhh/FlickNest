import { MdStarRate } from 'react-icons/md'
import { MediaDetails } from '../../types/details.types'
import { formatDate, formatRating } from '../../utils/formatters'

interface MediaHeroProps {
  details: MediaDetails
  imageURL: string
}

const MediaHero = ({ details, imageURL }: MediaHeroProps) => {
  const title = details.title || details.name
  const releaseDate = details.release_date || details.first_air_date
  const runtime = details.runtime || details.episode_run_time?.[0]

  return (
    <div className="relative h-[70vh]">
      <div className="absolute inset-0">
        <img
          src={`${imageURL}${details.backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151320] to-transparent" />
      </div>

      <div className="absolute bottom-0 w-full px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`${imageURL}${details.poster_path}`}
              alt={title}
              className="w-48 md:w-64 rounded-lg shadow-xl"
            />

            <div className="flex flex-col justify-end">
              <h1 className="text-4xl font-bold mb-3">{title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1">
                  <MdStarRate className="text-yellow-400" />
                  {formatRating(details.vote_average)}
                </span>
                <span>{formatDate(releaseDate || 'Unknown')}</span>
                {runtime && <span>{runtime} min</span>}
              </div>
              <div className="flex gap-2 mb-4">
                {details.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-[#B1D690]/20 text-[#B1D690] rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 max-w-2xl">{details.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaHero