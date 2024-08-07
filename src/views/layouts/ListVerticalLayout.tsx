/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React
import React, { useState } from 'react'

// ** Next
import { NextPage } from 'next'

// ** Mui
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { List } from '@mui/material'
import IconifyIcon from 'src/components/Icon'
import { VerticalItem } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: {
    [key: string]: boolean
  }
  items: any
  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  disabled: boolean
}

const RecursiveListItem = ({ item, level }: { item: any; level: number }) => {
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenState(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <>
      {item?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                paddingLeft: `${level * 20}px`
              }}
              onClick={() => {
                if (item.children) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              {item?.children && item.children.length > 0 && (
                <>
                  {openState[item.title] ? (
                    <IconifyIcon icon='ic:twoone-expand-more' />
                  ) : (
                    <IconifyIcon icon='ic:twoone-expand-less' />
                  )}
                </>
              )}
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                {item.children.map((child: any) => {
                  return (
                    <Collapse in={openState[item.title]} timeout='auto' unmountOnExit>
                      <RecursiveListItem item={item.children} level={level + 1} />
                    </Collapse>
                  )
                })}
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = () => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'

      // subheader={
      //   <ListSubheader component='div' id='nested-list-subheader'>
      //     Nested List Items
      //   </ListSubheader>
      // }
    >
      <RecursiveListItem item={VerticalItem} level={1} />
    </List>
  )
}

export default ListVerticalLayout
