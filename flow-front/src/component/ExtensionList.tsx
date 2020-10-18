
import React, { useState } from 'react';
import { Grid, TextField, Button, Box } from "@material-ui/core"

interface ExtensionListProps {
  extensionList: Array<string>
  deleteCustomExtension: (oldExtension: string) => void
}
const ExtensionList = (props: ExtensionListProps) => {

  return (
    <Box border={1} borderRadius={4} maxWidth="50%">
      <Grid container
        direction="column"
        justify="center"
        spacing={2}
      >
        <Grid item xs>
          {`${props.extensionList.length} / 200`}
        </Grid>
        <Grid item>
          {props.extensionList.map((value, idx) => {
            return (
              <Button key={idx}
                variant="outlined"
                size="small"
                onClick={
                  () => { props.deleteCustomExtension(value) }
                }>
                {value}
              </Button>
            )
          })}
        </Grid>

      </Grid>
    </Box>
  )
}

export default ExtensionList