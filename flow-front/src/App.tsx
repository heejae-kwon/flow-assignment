
import React, { useEffect, useState } from 'react';
import CustomExtension from './component/CustomExtension'
import ExtensionList from './component/ExtensionList'
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid } from "@material-ui/core"
import axios from 'axios';

interface GetAllExtensions {
  extensionList: Extension[]
}
interface Extension {
  extension: string
}

function fixedEncodeURI(str: string) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

const App = () => {
  const [extensions, setExtensions] = useState<Set<string>>(new Set)
  const batCheck = extensions.has("bat")
  const cmdCheck = extensions.has("cmd")
  const comCheck = extensions.has("com")
  const cplCheck = extensions.has("cpl")
  const exeCheck = extensions.has("exe")
  const scrCheck = extensions.has("scr")
  const jsCheck = extensions.has("js")

  const server = "http://localhost:8000"

  useEffect(() => {
    const initExtensions = async () => {
      try {
        const result = ((await axios.get(fixedEncodeURI(`${server}/api/extension`))).data) as GetAllExtensions
        const newExtensions = new Set<string>()
        result.extensionList.forEach((value) => {
          newExtensions.add(value.extension)
        })
        setExtensions(newExtensions)
      } catch (error) {
        console.log(error)
      }
    }
    initExtensions()
  }, [])

  const addCustomExtension = async (newExtension: string) => {
    if (extensions.size < 200) {
      try {
        await axios.put(fixedEncodeURI(`${server}/api/extension?extensionName=${newExtension}`))
        const newExtensions = new Set(extensions)
        newExtensions.add(newExtension)
        setExtensions(newExtensions)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const deleteCustomExtension = async (oldExtension: string) => {
    try {
      await axios.delete(fixedEncodeURI(`${server}/api/extension?extensionName=${oldExtension}`))
      const newExtensions = new Set(extensions)
      newExtensions.delete(oldExtension)
      setExtensions(newExtensions)
    } catch (error) {

    }
  }
  const checkBoxOnClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const ext = event.currentTarget.value
    console.log(ext)
    if (extensions.has(ext)) {
      await deleteCustomExtension(ext)
    }
    else {
      await addCustomExtension(ext)
    }
  }

  return (
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs>
            고정 확장자
          </Grid>
          <Grid item>
            <FormControl>
              <FormGroup row={true}>
                <FormControlLabel
                  control={<Checkbox checked={batCheck} value="bat"
                    onChange={checkBoxOnClick} />}
                  label="bat"
                />
                <FormControlLabel
                  control={<Checkbox checked={cmdCheck} value="cmd"
                    onChange={checkBoxOnClick} />}
                  label="cmd"
                />
                <FormControlLabel
                  control={<Checkbox checked={comCheck} value="com"
                    onChange={checkBoxOnClick} />}
                  label="com"
                />
                <FormControlLabel
                  control={<Checkbox checked={cplCheck} value="cpl"
                    onChange={checkBoxOnClick} />}
                  label="cpl"
                />
                <FormControlLabel
                  control={<Checkbox checked={exeCheck} value="exe"
                    onChange={checkBoxOnClick} />}
                  label="exe"
                />
                <FormControlLabel
                  control={<Checkbox checked={scrCheck} value="scr"
                    onChange={checkBoxOnClick} />}
                  label="scr"
                />
                <FormControlLabel
                  control={<Checkbox checked={jsCheck} value="js"
                    onChange={checkBoxOnClick} />}
                  label="js"
                />

              </FormGroup>
            </FormControl>
          </Grid>

        </Grid>
      </Grid>
      <Grid item>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs>
            커스텀 확장자
          </Grid>
          <Grid item>
            <Grid container
              direction="column"
              justify="center"
              spacing={2}
            >

              <Grid item>
                <CustomExtension addExtension={addCustomExtension} />
              </Grid>
              <Grid item>
                <ExtensionList extensionList={Array.from(extensions)}
                  deleteCustomExtension={deleteCustomExtension} />
              </Grid>
            </Grid>

          </Grid>

        </Grid>
      </Grid>

    </Grid>
  );
}

export default App;
