import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { WIDTH_DRAWER_WINDOW } from '@/constants/forum'
import { TForumNavLink } from '@/types/forum'

interface IDrawerNavProps {
  onOpenModal?: VoidFunction
  links: TForumNavLink[]
}

export const DrawerNav: FC<IDrawerNavProps> = ({ onOpenModal, links }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: WIDTH_DRAWER_WINDOW }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders">
      <Drawer
        variant="permanent"
        open
        sx={{
          display: 'block',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: WIDTH_DRAWER_WINDOW,
          },
        }}>
        <div>
          <Toolbar>Navigation</Toolbar>
          <Divider />
          <List>
            {links.map(({ title, url, Icon }, index) => (
              <NavLink to={url} key={index}>
                <ListItem key={title} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          {onOpenModal && (
            <>
              <Divider />
              <List>
                <ListItemButton onClick={onOpenModal}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add topic" />
                </ListItemButton>
              </List>
            </>
          )}
        </div>
      </Drawer>
    </Box>
  )
}
