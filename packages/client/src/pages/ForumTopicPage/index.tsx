import { useParams } from 'react-router-dom'

export function ForumTopicPage() {
  const { id } = useParams()
  return <h1>Forum Topic Page - ID Topic {id}</h1>
}
