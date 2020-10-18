import React, { useState } from 'react';
import { Grid, TextField, Button } from "@material-ui/core"

interface CustomExtensionProps {
  addExtension: (newExtension: string) => Promise<void>
}

const CustomExtension = (props: CustomExtensionProps) => {
  const [userExtension, setUserExtension] = useState("")

  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs>
        <form>
          <TextField id="outlined-basic"
            size="small"
            label="확장자 입력"
            variant="standard"
            value={userExtension}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.currentTarget.value.length <= 20) {
                setUserExtension(event.currentTarget.value)
              }
            }} />
        </form>
      </Grid>
      <Grid item xs>
        <Button variant="outlined"
          onClick={async() => {
            await props.addExtension(userExtension)
          }}
          size="small">
          추가
          </Button>
      </Grid>
    </Grid>
  )
}

export default CustomExtension
