import express from "express";
import ExtensionDB from "../ExtensionDB";

const router = express.Router();

/*
interface Extension {
  extension: string;
}
interface GetResponse {
  extensionsList: Extension[];
}
*/
router.get("/", async (req, res) => {
  try {
    const extensionList = await ExtensionDB.getAllExtensions();
    res.status(200);
    res.json({ extensionList });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put("/", async (req, res) => {
  if (!req.query.extensionName) {
    res.status(400).send();
    return;
  }
  const extension = req.query.extensionName as string;
  if (extension.length > 20) {
    res.status(400).send();
    return;
  }
  try {
    const extensionList = await ExtensionDB.getAllExtensions();
    if (extensionList.length >= 200) {
      res.status(403).send({ message: "DB is full" });
      return;
    }
    const found = await ExtensionDB.findExtension(extension);
    if (found) {
      res.status(403).send({ message: "Duplicated" });
      return;
    }

    const result = await ExtensionDB.insertExtension(extension);
    if (result) {
      res.status(200).send();
    } else {
      res.status(500).send({ message: "INSERT is failed" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete("/", async (req, res) => {
  if (!req.query.extensionName) {
    res.status(400).send();
    return;
  }
  const extension = req.query.extensionName as string;
  if (extension.length > 20) {
    res.status(400).send();
    return;
  }

  try {
    const result = await ExtensionDB.removeExtension(extension);
    if (result) {
      res.status(200).send();
    } else {
      res.status(500).send({ message: "DELETE is failed" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
