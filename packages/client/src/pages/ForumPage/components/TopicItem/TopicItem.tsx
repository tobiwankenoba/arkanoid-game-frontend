import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'

import { TTopic } from '@/types/topic'

type TTopicItemProps = TTopic

export const TopicItem: React.FC<TTopicItemProps> = ({
  title,
  text,
  id,
}: TTopicItemProps) => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <NavLink to={'/forum/topic/' + id}>
        <ListItemButton
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <ListItemAvatar sx={{ height: 54, width: 54 }}>
            <AccountCircleIcon sx={{ height: 54, width: 54 }} />
          </ListItemAvatar>
          <Box display="flex" flexDirection="column">
            <Box display="flex" gap={1}>
              <Typography>{id}:</Typography>
              <Typography>{title}</Typography>
            </Box>
            <Box>
              <Typography>{text.slice(0, 50)}...</Typography>
            </Box>
          </Box>
        </ListItemButton>
      </NavLink>
    </ListItem>
  )
}
